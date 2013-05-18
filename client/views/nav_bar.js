	
	Template.nav_bar.contentTypes = function() {
		return Session.get('current_content_types');
	}
		
	Template.nav_bar.events({
		'click .nav_button' : function(event) {
			var contentType = event.target.getAttribute('data-content-type');
			Session.set('current_content', contentType);
			setCurrentContentTypes();
		}
	});
