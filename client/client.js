	
	
	
	Meteor.subscribe("links");
	Meteor.subscribe("users", function()***REMOVED***
		users = Meteor.users.find();
		Session.set('total_users', users.count() - 1);
	***REMOVED***);
	
	Meteor.subscribe("comments");
	
	Meteor.subscribe("answers");
					
	Meteor.startup(function () ***REMOVED***
		// if the current content for the dashboard is null
		// set it to the default 
		if(Session.get('current_content') == null) ***REMOVED***
	   		Session.set('current_content', 'home');
		***REMOVED***
		setCurrentContentTypes();
		
		
	***REMOVED***);
											
	
