
	Comments = new Meteor.Collection("comments");

	Comments.allow({
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
		
		createComment : function(options) {
			options = options || {};
			var comment = {
				text : options.text,
				commentor : options.commentor,
				commentor_name : options.commentor_name,
				link_id : options.link_id,
			};
			
			var commentPoint = {
				'type' : 'comment',
				'details' : 'commented on link',
				'user_id' : this.userId,
				'count' : 1,
				'created_time' : new Date(),
			};
			
			Points.insert(commentPoint);
			
				if(options.commentor != options.link_creator) {
				
				var linkCreatorPoint = {
					'type' : 'link',
					'details' : 'link generated comment',
					'user_id' : options.link_creator,
					'count' : 3,
					'created_time' : new Date(),
				};
				
				Points.insert(linkCreatorPoint);
				
			}
			
			Comments.insert(comment);
		}
		
	});