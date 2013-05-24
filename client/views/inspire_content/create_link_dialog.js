	
	
	var handleCreateLinkErrors = function(options) {
		
		var createLinkErrorConditions = {
			no_title : {
				check : function(options) {
					return options.title.length == 0;
				},
				get_message : function(options) {
					return "Titles are important in life";
				},
			},
			no_description : {
				check : function(options) {
					return options.description.length == 0;
				},
				get_message : function(options) {
					return "What, you don't even want to describe it?  Come on...";
				},
			},
			no_url : {
				check : function(options) {
					return options.url.length == 0;
				},
				get_message : function(options) {
					return "Oh, you want to link to nothing, very funny";
				},
			},
			
		};
		
		var onCreateLinkError = function(message) {
			Session.set('createLinkError', message);
		}
		
		return handleErrors(options, createLinkErrorConditions, onCreateLinkError);
	}
	
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
			
			hasErrors = handleCreateLinkErrors(options);
			if(!hasErrors) {
				var successful = Meteor.call('createLink', options);
				setPointsByUser();
				Session.set('showCreateLinkDialog', false);
			}
		}
	});
	
	Template.create_link_dialog.error = function () {
		return Session.get('createLinkError');
	}
