	
	Template.link_item.events(***REMOVED***
		'click .delete-btn' : function(event, template) ***REMOVED***
			Links.remove(template.data._id);
		***REMOVED***,
		'click .mark-read-btn' : function(event, template) ***REMOVED***
			Meteor.call('markAsRead', template.data._id, Meteor.userId());
			setPointsByUser();
		***REMOVED***,
		'keydown .add-comment' : function(event, template) ***REMOVED***
			if(event.which == 13) ***REMOVED***
				
				var linkID = event.target.getAttribute('data-link');
				var linkCreator = event.target.getAttribute('data-link-creator');
				var text = template.find(".add-comment").value;
				var commentorName = Meteor.user().profile.name;
				var commentor = Meteor.userId();
				var options = ***REMOVED***
					text : text,
					commentor : commentor,
					commentor_name : commentorName,
					link_id : linkID,
					link_creator : linkCreator
				***REMOVED***;
				Meteor.call('createComment', options);
				event.target.value = "";
			***REMOVED***
			if(event.which == 27) ***REMOVED***
				
			***REMOVED***
		***REMOVED***
	***REMOVED***);
	
	Template.link_item.getComments = function() ***REMOVED***
		var comments = Comments.find(***REMOVED***link_id : this._id***REMOVED***);		
		return comments;
	***REMOVED***
	