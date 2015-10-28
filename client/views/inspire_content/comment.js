	
	Template.comment.events({
		'click .edit-comment' : function(event) {
			event.preventDefault();
			Session.set('comment_being_edited', this._id);
		},
		'click .delete-comment' : function(event) {
			event.preventDefault();
			Comments.remove(this._id);
		},

		'keydown .edit-comment-input' : function(event, template) {
			if(event.which == 13) {
				var newText = template.find('.edit-comment-input').value;
				Comments.update(this._id, {$set : {text : newText}});
				Session.set('comment_being_edited', null);
			}
			if(event.which == 27) {
				Session.set('comment_being_edited', null);
			}
		},
	});
	
	Template.comment.editing = function() {
		return Session.get('comment_being_edited') == this._id;
	}
	
	Template.comment.isMine = function() {
		return this.commentor == Meteor.userId();
	}
