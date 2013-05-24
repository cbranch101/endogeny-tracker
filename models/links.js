
	Links = new Meteor.Collection("links");
	
	Links.allow(***REMOVED***
		insert: function(userId, link) ***REMOVED***
			return true;
		***REMOVED***,
		update: function(userId, link) ***REMOVED***
			return link.creator == userId;
		***REMOVED***,
		remove : function(userId, link) ***REMOVED***
			return link.creator == userId;
		***REMOVED***
	***REMOVED***);
	
	Meteor.methods(***REMOVED***
		
		createLink : function(options) ***REMOVED***
			var currentTime = new Date().getTime();
			options = options || ***REMOVED******REMOVED***;
			
			var link = ***REMOVED***
				creator: this.userId,
				url: options.url,
				title: options.title,
				description: options.description,
				readers : [],
				createTime: currentTime,
			***REMOVED***;
			
			var pointsForCreator = ***REMOVED***
				type : 'link',
				details : 'created link',
				user_id : this.userId,
				count : 10,
				created_time : new Date(),
			***REMOVED***;
			
			Meteor.call('addPoints', pointsForCreator);
			
			return Links.insert(link);	
			
		***REMOVED***,
		
		markAsRead : function(linkID, reader) ***REMOVED***
			var updateAction = ***REMOVED***
				$addToSet : ***REMOVED***'readers' : reader***REMOVED***
			***REMOVED***;
			
			var pointsForCreator = ***REMOVED***
				'type' : 'link',
				'details' : 'link was read',
				'user_id' : this.creator,
				'count' : 6,
				'created_time' : new Date(),
			***REMOVED***;
			
			Meteor.call('addPoints', pointsForCreator);
					
			var pointsForReader = ***REMOVED***
				'type' : 'link',
				'details' : 'read link',
				'user_id' : reader,
				'count' : 3,
				'created_time' : new Date(),
			***REMOVED***;
			
			Meteor.call('addPoints', pointsForReader);
						
			Links.update(***REMOVED***'_id' : linkID***REMOVED***, updateAction);
			
		***REMOVED***	
	***REMOVED***);