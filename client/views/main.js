	Template.main.isLoggedIn = function() {
		return Meteor.userId() != null;	
	};
