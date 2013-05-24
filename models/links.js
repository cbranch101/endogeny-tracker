
	Links = new Meteor.Collection("links");
	
	Links.allow({
		insert: function(userId, link) {
			return true;
		},
		update: function(userId, link) {
			return link.creator == userId;
		},
		remove : function(userId, link) {
			return link.creator == userId;
		}
	});
	
	Meteor.methods({
		
		createLink : function(options) {
			var currentTime = new Date().getTime();
			options = options || {};
			
			var link = {
				creator: this.userId,
				url: options.url,
				title: options.title,
				description: options.description,
				readers : [],
				createTime: currentTime,
			};
			
			var pointsForCreator = {
				type : 'link',
				details : 'created link',
				user_id : this.userId,
				count : 10,
				created_time : new Date(),
			};
			
			Meteor.call('addPoints', pointsForCreator);
			
			return Links.insert(link);	
			
		},
		
		markAsRead : function(linkID, reader) {
			var updateAction = {
				$addToSet : {'readers' : reader}
			};
			
			var pointsForCreator = {
				'type' : 'link',
				'details' : 'link was read',
				'user_id' : this.creator,
				'count' : 6,
				'created_time' : new Date(),
			};
			
			Meteor.call('addPoints', pointsForCreator);
					
			var pointsForReader = {
				'type' : 'link',
				'details' : 'read link',
				'user_id' : reader,
				'count' : 3,
				'created_time' : new Date(),
			};
			
			Meteor.call('addPoints', pointsForReader);
						
			Links.update({'_id' : linkID}, updateAction);
			
		}	
	});