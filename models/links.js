
	Links = new Meteor.Collection("links");
	
	var handleCreateLinkErrors = function(options) ***REMOVED***
		var createLinkErrorConditions = ***REMOVED***
			no_title : ***REMOVED***
				check : function(options) ***REMOVED***
					return options.title.length == 0;
				***REMOVED***,
				get_message : function(options) ***REMOVED***
					return "Titles are important in life";
				***REMOVED***,
			***REMOVED***,
			no_description : ***REMOVED***
				check : function(options) ***REMOVED***
					return options.description.length == 0;
				***REMOVED***,
				get_message : function(options) ***REMOVED***
					return "What, you don't even want to describe it?  Come on...";
				***REMOVED***,
			***REMOVED***,
			no_url : ***REMOVED***
				check : function(options) ***REMOVED***
					return options.url.length == 0;
				***REMOVED***,
				get_message : function(options) ***REMOVED***
					return "Oh, you want to link to nothing, very funny";
				***REMOVED***,
			***REMOVED***,
			
		***REMOVED***;
		
		var onCreateLinkError = function(message) ***REMOVED***
			if(Meteor.isClient) ***REMOVED***
				Session.set('createLinkError', message);
			***REMOVED***
		***REMOVED***
		
		return handleErrors(options, createLinkErrorConditions, onCreateLinkError);
	***REMOVED***
	
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
			hasErrors = handleCreateLinkErrors(options);
			
			if(!hasErrors) ***REMOVED***
				var link = ***REMOVED***
					creator: this.userId,
					url: options.url,
					title: options.title,
					description: options.description,
					readers : [],
					createTime: currentTime,
				***REMOVED***;
				var point = ***REMOVED***
					'type' : 'link',
					'details' : 'created link',
					'user_id' : this.userId,
					'count' : 10,
					'created_time' : new Date(),
				***REMOVED***;
				
				Points.insert(point);
				
				return Links.insert(link);	
			***REMOVED*** else ***REMOVED***
				return false;
			***REMOVED***
			
		***REMOVED***,
		markAsRead : function(linkID, reader) ***REMOVED***
			var updateAction = ***REMOVED***
				$addToSet : ***REMOVED***'readers' : reader***REMOVED***
			***REMOVED***;
			
			var linkCreatorPoint = ***REMOVED***
				'type' : 'link',
				'details' : 'link was read',
				'user_id' : this.creator,
				'count' : 6,
				'created_time' : new Date(),
			***REMOVED***;
			
			Points.insert(linkCreatorPoint);
					
			var linkReaderPoint = ***REMOVED***
				'type' : 'link',
				'details' : 'read link',
				'user_id' : reader,
				'count' : 3,
				'created_time' : new Date(),
			***REMOVED***;
			
			Points.insert(linkCreatorPoint);
			
			Links.update(***REMOVED***'_id' : linkID***REMOVED***, updateAction);
			
		***REMOVED***	
	***REMOVED***);