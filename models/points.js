Points = new Meteor.Collection("points");

Meteor.methods(***REMOVED***
	addPoints : function(pointInfo) ***REMOVED***
		
		pointInfo.created_time = new Date();
		Points.insert(pointInfo);
		setPointsByUser();

	***REMOVED***,
***REMOVED***);