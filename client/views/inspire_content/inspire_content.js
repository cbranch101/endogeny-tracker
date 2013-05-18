	
	Template.inspire_content.events({
		'click #add-btn' : function() {
			Session.set('showCreateLinkDialog' , true);
		} 
	});
	
	Template.inspire_content.showCreateLinkDialog = function() {
		return Session.get('showCreateLinkDialog');
	}
