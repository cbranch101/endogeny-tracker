	
	
	var handleCreateLinkErrors = function(options) ***REMOVED***
		
		var createLinkErrorConditions = ***REMOVED***
			no_title : ***REMOVED***
				check : function(options) ***REMOVED***
					return options.title.length == 0;
				***REMOVED***,
				get_message : function(options) ***REMOVED***
					return "Titles are important in life";
				***REMOVED***,
			***REMOVED***,
			no_description : ***REMOVED***
				check : function(options) ***REMOVED***
					return options.description.length == 0;
				***REMOVED***,
				get_message : function(options) ***REMOVED***
					return "What, you don't even want to describe it?  Come on...";
				***REMOVED***,
			***REMOVED***,
			no_url : ***REMOVED***
				check : function(options) ***REMOVED***
					return options.url.length == 0;
				***REMOVED***,
				get_message : function(options) ***REMOVED***
					return "Oh, you want to link to nothing, very funny";
				***REMOVED***,
			***REMOVED***,
			
		***REMOVED***;
		
		var onCreateLinkError = function(message) ***REMOVED***
			Session.set('createLinkError', message);
		***REMOVED***
		
		return handleErrors(options, createLinkErrorConditions, onCreateLinkError);
	***REMOVED***
	
	Template.create_link_dialog.events(***REMOVED***
		'click .cancel' : function() ***REMOVED***
			Session.set('createLinkError', null);
			Session.set('showCreateLinkDialog', false);
		***REMOVED***,
		
		'click .save' : function(event, template) ***REMOVED***
			Session.set('createLinkError', null);
			var title = template.find(".title").value;
			var description = template.find('.description').value;
			var url = template.find('.url').value;
			var options = ***REMOVED***
				title : title,
				description : description,
				url : url
			***REMOVED***;
			
			hasErrors = handleCreateLinkErrors(options);
			if(!hasErrors) ***REMOVED***
				var successful = Meteor.call('createLink', options);
				setPointsByUser();
				Session.set('showCreateLinkDialog', false);
			***REMOVED***
		***REMOVED***
	***REMOVED***);
	
	Template.create_link_dialog.error = function () ***REMOVED***
		return Session.get('createLinkError');
	***REMOVED***
