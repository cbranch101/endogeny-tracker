	
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
			var successful = Meteor.call('createLink', options);
			setPointsByUser();
			Session.set('showCreateLinkDialog', false);
		***REMOVED***
	***REMOVED***);
	
	Template.create_link_dialog.error = function () ***REMOVED***
		return Session.get('createLinkError');
	***REMOVED***
