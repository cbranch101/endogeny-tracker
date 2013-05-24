	
	
	Template.answer.events(***REMOVED***
		
		'click .edit-answer' : function(event) ***REMOVED***
			event.preventDefault();
			Session.set('answer_being_edited', this._id);
		***REMOVED***,
		'click .delete-answer' : function(event) ***REMOVED***
			event.preventDefault();
			Answers.remove(this._id);
		***REMOVED***,

		'keydown .edit-answer-input' : function(event, template) ***REMOVED***
			if(event.which == 13) ***REMOVED***
				var newText = template.find('.edit-answer-input').value;
				Answers.update(this._id, ***REMOVED***$set : ***REMOVED***text : newText***REMOVED******REMOVED***);
				Session.set('answer_being_edited', null);
			***REMOVED***
			if(event.which == 27) ***REMOVED***
				Session.set('answer_being_edited', null);
			***REMOVED***
		***REMOVED***,
	***REMOVED***);
	
	Template.answer.editing = function() ***REMOVED***
		return Session.get('answer_being_edited') == this._id;
	***REMOVED***
	
	Template.answer.isMine = function() ***REMOVED***
		return this.answered_by == Meteor.userId();
	***REMOVED***
