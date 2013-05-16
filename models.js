


/*
var sampleLinkDocument = {
	creator : userId,
	url : urlForLink
	title : titleOfLink
	description : duh,
	readCount : number of people how have read this : String
	createdTime : timestamp,
};
*/



Links = new Meteor.Collection("links");
Comments = new Meteor.Collection("comments");
Points = new Meteor.Collection("points");


var handleErrors = function(input, errorConditions, onError) {
	
	errorFound = false;
	_.each(errorConditions, function(errorCondition){
		if(errorCondition.check(input) && !errorFound) {
			message = errorCondition.get_message(input);
			onError(message);
			errorFound = true;
		}
	});
}

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
		Session.set('createLinkError', message);
	}
	handleErrors(options, createLinkErrorConditions, onCreateLinkError);
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
	
	createLink : function(options) {
		var currentTime = new Date().getTime();
		options = options || {};
		handleCreateLinkErrors(options);
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
		
	},
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
	},
	
});