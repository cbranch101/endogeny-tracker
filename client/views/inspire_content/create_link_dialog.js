	
	Template.create_link_dialog.events({
		'click .cancel' : function() {
			Session.set('createLinkError', null);
			Session.set('showCreateLinkDialog', false);
		},
		'click .save' : function(event, template) {
			Session.set('createLinkError', null);
			var title = template.find(".title").value;
			var description = template.find('.description').value;
			var url = template.find('.url').value;
			var options = {
				title : title,
				description : description,
				url : url
			};
			var successful = Meteor.call('createLink', options);
			setPointsByUser();
			Session.set('showCreateLinkDialog', false);
		}
	});
	
	Template.create_link_dialog.error = function () {
		return Session.get('createLinkError');
	}
