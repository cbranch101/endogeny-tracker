	
	
	Template.answer.events({
		
		'click .edit-answer' : function(event) {
			event.preventDefault();
			Session.set('answer_being_edited', this._id);
		},
		'click .delete-answer' : function(event) {
			event.preventDefault();
			Answers.remove(this._id);
		},

		'keydown .edit-answer-input' : function(event, template) {
			if(event.which == 13) {
				var newText = template.find('.edit-answer-input').value;
				Answers.update(this._id, {$set : {text : newText}});
				Session.set('answer_being_edited', null);
			}
			if(event.which == 27) {
				Session.set('answer_being_edited', null);
			}
		},
	});
	
	Template.answer.editing = function() {
		return Session.get('answer_being_edited') == this._id;
	}
	
	Template.answer.isMine = function() {
		return this.answered_by == Meteor.userId();
	}
