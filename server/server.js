
var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));

Meteor.startup(function () {
	var localMode = true;
	if(localMode) {
		// first, remove configuration entry in case service is already configured
		Accounts.loginServiceConfiguration.remove({
		  service: "facebook"
		});
		Accounts.loginServiceConfiguration.insert({
		  service: "160321274139054",
		  clientId: "1292962797",
		  secret: "e4f4fddcc44725d67eb1e6d4a256de01"
		});  
	}
  Points.aggregate = function(pipeline) {
    var self = this;
    
    var future = new Future;
    self.find()._mongo.db.createCollection(self._name, function (err, collection) {
      if (err) {
        future.throw(err);
        return;
      }
      collection.aggregate(pipeline, function(err, result) {
        if (err) {
          future.throw(err);
          return;
        }
        future.ret([true, result]);
      });
    });
    var result = future.wait();
    if (!result[0])
      throw result[1];

    return result[1];
  };
      

});

Meteor.methods({
	getPointsPerUser : function(options) {
		var output = Points.aggregate([
			{
				$group : {
					_id : '$user_id',
					total_points : {
						'$sum' : '$count',
					},
				},
			},
		]);
		return output;
	},
});

Meteor.publish("links", function() {
	return Links.find();
});

Meteor.publish("users", function() {
	return Meteor.users.find();
});

Meteor.publish("comments", function() {
	return Comments.find();
});
