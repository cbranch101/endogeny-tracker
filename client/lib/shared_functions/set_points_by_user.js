	setPointsByUser = function() {
		Meteor.call('getPointsPerUser', function(err, results){
			
			var rawPointsByUser = results;		
			
			var indexedPointsByUser = {}
			_.map(rawPointsByUser, function(pointsForUser){
				indexedPointsByUser[pointsForUser._id] = pointsForUser;
			});
		
			
			var results = Meteor.users.find();
			
			var users = results.collection.docs;
			
			pointsByUser = _.map(users, function(user){
				
				var points = indexedPointsByUser.hasOwnProperty(user._id) ? indexedPointsByUser[user._id]['total_points'] : 0;
				return {
					user_name : user.profile.name,
					points : points,
				};
			});
			
			Session.set('points_by_user', pointsByUser);
			
		});
	}
