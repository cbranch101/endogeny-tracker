	
	
	
	Meteor.subscribe("links");
	Meteor.subscribe("users", function(){
		users = Meteor.users.find();
		Session.set('total_users', users.count() - 1);
	});
	
	Meteor.subscribe("comments");
					
	Meteor.startup(function () {
		// if the current content for the dashboard is null
		// set it to the default 
		if(Session.get('current_content') == null) {
	   		Session.set('current_content', 'home');
		}
		setCurrentContentTypes();
		setPointsByUser();
		
		
	});
							
	Template.status_list.getPointsByUser = function() {
		
		return Session.get('points_by_user');
		
	}
				
	
