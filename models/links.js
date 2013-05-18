
	Links = new Meteor.Collection("links");
	
	var handleCreateLinkErrors = function(options) {
		var createLinkErrorConditions = {
			no_title : {
				check : function(options) {
					return options.title.length == 0;
				},
				get_message : function(options) {
					return "Titles are important in life";
				},
			},
			no_description : {
				check : function(options) {
					return options.description.length == 0;
				},
				get_message : function(options) {
					return "What, you don't even want to describe it?  Come on...";
				},
			},
			no_url : {
				check : function(options) {
					return options.url.length == 0;
				},
				get_message : function(options) {
					return "Oh, you want to link to nothing, very funny";
				},
			},
			
		};
		
		var onCreateLinkError = function(message) {
			if(Meteor.isClient) {
				Session.set('createLinkError', message);
			}
		}
		
		return handleErrors(options, createLinkErrorConditions, onCreateLinkError);
	}
	
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
			hasErrors = handleCreateLinkErrors(options);
			
			if(!hasErrors) {
				var link = {
					creator: this.userId,
					url: options.url,
					title: options.title,
					description: options.description,
					readers : [],
					createTime: currentTime,
				};
				var point = {
					'type' : 'link',
					'details' : 'created link',
					'user_id' : this.userId,
					'count' : 10,
					'created_time' : new Date(),
				};
				
				Points.insert(point);
				
				return Links.insert(link);	
			} else {
				return false;
			}
			
		},
		markAsRead : function(linkID, reader) {
			var updateAction = {
				$addToSet : {'readers' : reader}
			};
			
			var linkCreatorPoint = {
				'type' : 'link',
				'details' : 'link was read',
				'user_id' : this.creator,
				'count' : 6,
				'created_time' : new Date(),
			};
			
			Points.insert(linkCreatorPoint);
					
			var linkReaderPoint = {
				'type' : 'link',
				'details' : 'read link',
				'user_id' : reader,
				'count' : 3,
				'created_time' : new Date(),
			};
			
			Points.insert(linkCreatorPoint);
			
			Links.update({'_id' : linkID}, updateAction);
			
		}	
	});