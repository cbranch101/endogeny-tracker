
var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));

Meteor.startup(function () ***REMOVED***
	var localMode = true;
	if(localMode) ***REMOVED***
		// first, remove configuration entry in case service is already configured
		Accounts.loginServiceConfiguration.remove(***REMOVED***
		  service: "facebook"
		***REMOVED***);
		Accounts.loginServiceConfiguration.insert(***REMOVED***
		  service: "160321274139054",
		  clientId: "1292962797",
		  secret: "e4f4fddcc44725d67eb1e6d4a256de01"
		***REMOVED***);  
	***REMOVED***
  Points.aggregate = function(pipeline) ***REMOVED***
    var self = this;
    
    var future = new Future;
    self.find()._mongo.db.createCollection(self._name, function (err, collection) ***REMOVED***
      if (err) ***REMOVED***
        future.throw(err);
        return;
      ***REMOVED***
      collection.aggregate(pipeline, function(err, result) ***REMOVED***
        if (err) ***REMOVED***
          future.throw(err);
          return;
        ***REMOVED***
        future.ret([true, result]);
      ***REMOVED***);
    ***REMOVED***);
    var result = future.wait();
    if (!result[0])
      throw result[1];

    return result[1];
  ***REMOVED***;
      

***REMOVED***);

Meteor.methods(***REMOVED***
	getPointsPerUser : function(options) ***REMOVED***
		var output = Points.aggregate([
			***REMOVED***
				$group : ***REMOVED***
					_id : '$user_id',
					total_points : ***REMOVED***
						'$sum' : '$count',
					***REMOVED***,
				***REMOVED***,
			***REMOVED***,
		]);
		return output;
	***REMOVED***,
***REMOVED***);

Meteor.publish("links", function() ***REMOVED***
	return Links.find(***REMOVED******REMOVED***);
***REMOVED***);

Meteor.publish("users", function() ***REMOVED***
	return Meteor.users.find();
***REMOVED***);

Meteor.publish("comments", function() ***REMOVED***
	return Comments.find();
***REMOVED***);

Meteor.publish("answers", function() ***REMOVED***
	return Answers.find();
***REMOVED***);
