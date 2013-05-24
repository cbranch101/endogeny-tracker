	Template.question_item.events({
		'click .delete-btn' : function(event, template) {
			Answers.remove(template.data._id);
		},
		'keydown .add-answer' : function(event, template) {
			if(event.which == 13) {
				
				var questionID = event.target.getAttribute('data-question');
				var questionCreator = event.target.getAttribute('data-question-creator');
				var text = template.find(".add-answer").value;
				var answeredByName = Meteor.user().profile.name;
				var answeredBy = Meteor.userId();
				var options = {
					text : text,
					answered_by : answeredBy,
					answered_by_name : answeredByName,
					question_id : questionID,
					question_creator : questionCreator,
				};
				Meteor.call('createAnswer', options);
				event.target.value = "";
			}
			if(event.which == 27) {
				
			}
		}
	});
	
	Template.question_item.getAnswers = function() {
		var comments = Answers.find({link_id : this._id});		
		return comments;
	}
