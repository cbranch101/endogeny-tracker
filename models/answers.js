	Answers = new Meteor.Collection("answers");
	
	Answers.allow({
		insert: function(userId, comment) {
			return false;
		},
		update: function(userId, comment) {
			return true;
		},
		remove : function(userId, link) {
			return true;
		},
	});
	
	
	Meteor.methods({
		
		createAnswer : function(options) {
			options = options || {};
			var answer = {
				text : options.text,
				answered_by : options.answered_by,
				answered_by_name : options.answered_by_name,
				question_id : options.question_id,
			};
			
			var answeredByPoint = {
				'type' : 'answer',
				'details' : 'answered a question',
				'user_id' : this.userId,
				'count' : 5,
				'created_time' : new Date(),
			};
			
			Points.insert(answeredByPoint);
			
				if(options.answered_by != options.question_creator) {
				
				var questionCreatorPoint = {
					'type' : 'question',
					'details' : 'question generated answer',
					'user_id' : options.question_creator,
					'count' : 5,
					'created_time' : new Date(),
				};
				
				Points.insert(questionCreatorPoint);
				
			}
			
			Answers.insert(answer);
		}
		
	});