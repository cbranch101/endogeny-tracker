	
	Template.comment.events(***REMOVED***
		'click .edit-comment' : function(event) ***REMOVED***
			event.preventDefault();
			Session.set('comment_being_edited', this._id);
		***REMOVED***,
		'click .delete-comment' : function(event) ***REMOVED***
			event.preventDefault();
			Comments.remove(this._id);
		***REMOVED***,

		'keydown .edit-comment-input' : function(event, template) ***REMOVED***
			if(event.which == 13) ***REMOVED***
				var newText = template.find('.edit-comment-input').value;
				Comments.update(this._id, ***REMOVED***$set : ***REMOVED***text : newText***REMOVED******REMOVED***);
				Session.set('comment_being_edited', null);
			***REMOVED***
			if(event.which == 27) ***REMOVED***
				Session.set('comment_being_edited', null);
			***REMOVED***
		***REMOVED***,
	***REMOVED***);
	
	Template.comment.editing = function() ***REMOVED***
		return Session.get('comment_being_edited') == this._id;
	***REMOVED***
	
	Template.comment.isMine = function() ***REMOVED***
		return this.commentor == Meteor.userId();
	***REMOVED***
