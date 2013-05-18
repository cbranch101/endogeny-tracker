	
	Template.nav_bar.contentTypes = function() ***REMOVED***
		return Session.get('current_content_types');
	***REMOVED***
		
	Template.nav_bar.events(***REMOVED***
		'click .nav_button' : function(event) ***REMOVED***
			var contentType = event.target.getAttribute('data-content-type');
			Session.set('current_content', contentType);
			setCurrentContentTypes();
		***REMOVED***
	***REMOVED***);
