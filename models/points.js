Points = new Meteor.Collection("points");

Meteor.methods({
	addPoints : function(pointInfo) {
		
		pointInfo.created_time = new Date();
		Points.insert(pointInfo);
		setPointsByUser();

	},
});