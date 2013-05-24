	setPointsByUser = function() ***REMOVED***
		Meteor.call('getPointsPerUser', function(err, results)***REMOVED***
			
			var rawPointsByUser = results;		
			
			var indexedPointsByUser = ***REMOVED******REMOVED***
			_.map(rawPointsByUser, function(pointsForUser)***REMOVED***
				indexedPointsByUser[pointsForUser._id] = pointsForUser;
			***REMOVED***);
		
			
			var results = Meteor.users.find();
			
			var users = results.collection.docs;
			
			pointsByUser = _.map(users, function(user)***REMOVED***
				
				var points = indexedPointsByUser.hasOwnProperty(user._id) ? indexedPointsByUser[user._id]['total_points'] : 0;
				Meteor.call('updatePoints', user._id, points);
				
			***REMOVED***);
			
		***REMOVED***);
	***REMOVED***
