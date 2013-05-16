


/*
var sampleLinkDocument = ***REMOVED***
	creator : userId,
	url : urlForLink
	title : titleOfLink
	description : duh,
	readCount : number of people how have read this : String
	createdTime : timestamp,
***REMOVED***;
*/



Links = new Meteor.Collection("links");
Comments = new Meteor.Collection("comments");
Points = new Meteor.Collection("points");


var handleErrors = function(input, errorConditions, onError) ***REMOVED***
	
	errorFound = false;
	_.each(errorConditions, function(errorCondition)***REMOVED***
		if(errorCondition.check(input) && !errorFound) ***REMOVED***
			message = errorCondition.get_message(input);
			onError(message);
			errorFound = true;
		***REMOVED***
	***REMOVED***);
***REMOVED***

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
		Session.set('createLinkError', message);
	***REMOVED***
	handleErrors(options, createLinkErrorConditions, onCreateLinkError);
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
	
	createLink : function(options) ***REMOVED***
		var currentTime = new Date().getTime();
		options = options || ***REMOVED******REMOVED***;
		handleCreateLinkErrors(options);
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
		
	***REMOVED***,
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
	***REMOVED***,
	
***REMOVED***);