	
	Template.content.showInspireContent = function() {
		return Session.get('current_content') == 'inspire';
	}
	
	Template.content.showHomeContent = function() {
		return Session.get('current_content') == 'home';
	}
