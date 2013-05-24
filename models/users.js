	Meteor.methods({
		updatePoints : function(id, points) {
			Meteor.users.update({_id : id}, {$set : {total_points : points}});
		},
	});