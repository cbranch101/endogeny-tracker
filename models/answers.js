	Answers = new Meteor.Collection("answers");
	
	Answers.allow(***REMOVED***
		insert: function(userId, comment) ***REMOVED***
			return false;
		***REMOVED***,
		update: function(userId, comment) ***REMOVED***
			return true;
		***REMOVED***,
		remove : function(userId, link) ***REMOVED***
			return true;
		***REMOVED***,
	***REMOVED***);
	
	Meteor.methods(***REMOVED***
		
		createAnswer : function(options) ***REMOVED***
			options = options || ***REMOVED******REMOVED***;
			var answer = ***REMOVED***
				text : options.text,
				answered_by : options.answered_by,
				answered_by_name : options.answered_by_name,
				question_id : options.question_id,
			***REMOVED***;
			
			var answeredByPoint = ***REMOVED***
				'type' : 'answer',
				'details' : 'answered a question',
				'user_id' : this.userId,
				'count' : 5,
				'created_time' : new Date(),
			***REMOVED***;
			
			Points.insert(answeredByPoint);
			
				if(options.answered_by != options.question_creator) ***REMOVED***
				
				var questionCreatorPoint = ***REMOVED***
					'type' : 'question',
					'details' : 'question generated answer',
					'user_id' : options.question_creator,
					'count' : 5,
					'created_time' : new Date(),
				***REMOVED***;
				
				Points.insert(questionCreatorPoint);
				
			***REMOVED***
			
			Answers.insert(answer);
		***REMOVED***
		
	***REMOVED***);