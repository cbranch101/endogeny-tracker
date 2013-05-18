
	Comments = new Meteor.Collection("comments");

	Comments.allow(***REMOVED***
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
		
		createComment : function(options) ***REMOVED***
			options = options || ***REMOVED******REMOVED***;
			var comment = ***REMOVED***
				text : options.text,
				commentor : options.commentor,
				commentor_name : options.commentor_name,
				link_id : options.link_id,
			***REMOVED***;
			
			var commentPoint = ***REMOVED***
				'type' : 'comment',
				'details' : 'commented on link',
				'user_id' : this.userId,
				'count' : 1,
				'created_time' : new Date(),
			***REMOVED***;
			
			Points.insert(commentPoint);
			
				if(options.commentor != options.link_creator) ***REMOVED***
				
				var linkCreatorPoint = ***REMOVED***
					'type' : 'link',
					'details' : 'link generated comment',
					'user_id' : options.link_creator,
					'count' : 3,
					'created_time' : new Date(),
				***REMOVED***;
				
				Points.insert(linkCreatorPoint);
				
			***REMOVED***
			
			Comments.insert(comment);
		***REMOVED***
		
	***REMOVED***);