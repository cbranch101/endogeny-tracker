	Template.question_item.events(***REMOVED***
		'click .delete-btn' : function(event, template) ***REMOVED***
			Answers.remove(template.data._id);
		***REMOVED***,
		'keydown .add-answer' : function(event, template) ***REMOVED***
			if(event.which == 13) ***REMOVED***
				
				var questionID = event.target.getAttribute('data-question');
				var questionCreator = event.target.getAttribute('data-question-creator');
				var text = template.find(".add-answer").value;
				var answeredByName = Meteor.user().profile.name;
				var answeredBy = Meteor.userId();
				var options = ***REMOVED***
					text : text,
					answered_by : answeredBy,
					answered_by_name : answeredByName,
					question_id : questionID,
					question_creator : questionCreator,
				***REMOVED***;
				Meteor.call('createAnswer', options);
				event.target.value = "";
			***REMOVED***
			if(event.which == 27) ***REMOVED***
				
			***REMOVED***
		***REMOVED***
	***REMOVED***);
	
	Template.question_item.getAnswers = function() ***REMOVED***
		var comments = Answers.find(***REMOVED***link_id : this._id***REMOVED***);		
		return comments;
	***REMOVED***
