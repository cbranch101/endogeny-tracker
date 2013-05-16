	
	Meteor.subscribe("links");
	Meteor.subscribe("users", function()***REMOVED***
		users = Meteor.users.find();
		Session.set('total_users', users.count() - 1);
	***REMOVED***);
	Meteor.subscribe("comments");
	
	var setPointsByUser = function() ***REMOVED***
		Meteor.call('getPointsPerUser', function(err, results)***REMOVED***
			
			var rawPointsByUser = results;		
			
			var indexedPointsByUser = ***REMOVED******REMOVED***
			_.map(rawPointsByUser, function(pointsForUser)***REMOVED***
				indexedPointsByUser[pointsForUser._id] = pointsForUser;
			***REMOVED***);
		
			
			var results = Meteor.users.find();
			
			var users = results.collection.docs;
			
			pointsByUser = _.map(users, function(user)***REMOVED***
				
				var points = indexedPointsByUser.hasOwnProperty(user._id) ? indexedPointsByUser[user._id]['total_points'] : 0;
				return ***REMOVED***
					user_name : user.profile.name,
					points : points,
				***REMOVED***;
			***REMOVED***);
			
			Session.set('points_by_user', pointsByUser);
			
		***REMOVED***);
	***REMOVED***
		
	var setTotalUsers = function() ***REMOVED***
		
/* 		Session.set('total_users', totalUsers); */
	***REMOVED***
	
	Meteor.startup(function () ***REMOVED***
		// if the current content for the dashboard is null
		// set it to the default 
		if(Session.get('current_content') == null) ***REMOVED***
	   		Session.set('current_content', 'home');
		***REMOVED***
		setCurrentContentTypes();
		setPointsByUser();
	***REMOVED***);
	
	// Returns an event_map key for attaching "ok/cancel" events to
	// a text input (given by selector)
	var okcancel_events = function (selector) ***REMOVED***
	  return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
	***REMOVED***;
	
	// Creates an event handler for interpreting "escape", "return", and "blur"
	// on a text field and calling "ok" or "cancel" callbacks.
	var make_okcancel_handler = function (options) ***REMOVED***
	  var ok = options.ok || function () ***REMOVED******REMOVED***;
	  var cancel = options.cancel || function () ***REMOVED******REMOVED***;
	
	  return function (evt) ***REMOVED***
	    if (evt.type === "keydown" && evt.which === 27) ***REMOVED***
	      // escape = cancel
	      cancel.call(this, evt);
	
	    ***REMOVED*** else if (evt.type === "keyup" && evt.which === 13 ||
	               evt.type === "focusout") ***REMOVED***
	      // blur/return/enter = ok/submit if non-empty
	      var value = String(evt.target.value || "");
	      if (value)
	        ok.call(this, value, evt);
	      else
	        cancel.call(this, evt);
	    ***REMOVED***
	  ***REMOVED***;
	***REMOVED***;
	
	// Finds a text input in the DOM by id and focuses it.
	var focus_field_by_id = function (id) ***REMOVED***
	  var input = document.getElementById(id);
	  if (input) ***REMOVED***
	    input.focus();
	    input.select();
	  ***REMOVED***
	***REMOVED***;
		
	var contentTypes = [
		
		***REMOVED***
			id : 'home',
			button_name : 'Home',
		***REMOVED***,
		***REMOVED***
			id : 'inspire',
			button_name : 'Inspire',
		***REMOVED***,
		
	];
	
	var setCurrentContentTypes = function() ***REMOVED***
		
		var isActive = function(contentType) ***REMOVED***
			return Session.get('current_content') == contentType;
		***REMOVED***
		
		currentContentTypes = _.map(contentTypes, function(contentType)***REMOVED***
			var listClass = isActive(contentType['id']) ? "class = active" : '';
			contentType['list_class'] = listClass;
			return contentType;
		***REMOVED***);
				
		Session.set('current_content_types', currentContentTypes);
		
	***REMOVED***
		
	Template.main.isLoggedIn = function() ***REMOVED***
		return Meteor.userId() != null;	
	***REMOVED***;
	
	Template.nav_bar.contentTypes = function() ***REMOVED***
		return Session.get('current_content_types');
	***REMOVED***
		
	Template.nav_bar.events(***REMOVED***
		'click .nav_button' : function(event) ***REMOVED***
			var contentType = event.target.getAttribute('data-content-type');
			Session.set('current_content', contentType);
			setCurrentContentTypes();
		***REMOVED***
	***REMOVED***);
			
	Template.content.showInspireContent = function() ***REMOVED***
		return Session.get('current_content') == 'inspire';
	***REMOVED***
	
	Template.content.showHomeContent = function() ***REMOVED***
		return Session.get('current_content') == 'home';
	***REMOVED***
	
	var setReadPercentage = function(link) ***REMOVED***
		var totalUsers = Session.get('total_users');
		var read_percentage = link.readers == 0 ? 0 : link.readers.length / totalUsers;
		read_percentage = read_percentage * 100;
		read_percentage = Math.round(read_percentage);
		read_percentage = read_percentage + '%';
		link.read_percentage = read_percentage;
		link.percentage_text = link.readers.length + " of " + totalUsers;
		return link;
	***REMOVED***
	
	Template.link_list.getLinks = function() ***REMOVED***
		var links = Links.find();
		
		if(links.count() > 0) ***REMOVED***
			index = 0;
			links = links.map(function(link)***REMOVED***
				link.index = index;
				link.created_by_me = link.creator == Meteor.userId();
				link['read_by_me'] = _.contains(link.readers, Meteor.userId());
				link = setReadPercentage(link);
				link.has_readers = link.readers.length != 0;
				if(link.url.substr(0, 4) != 'http') ***REMOVED***
					link.url = 'http://' + link.url;
				***REMOVED***
				index++;
				return link;
			***REMOVED***);
		***REMOVED***
		
								
		return links;
	***REMOVED***
		
	Template.link_item.events(***REMOVED***
		'click .delete-btn' : function(event, template) ***REMOVED***
			Links.remove(template.data._id);
		***REMOVED***,
		'click .mark-read-btn' : function(event, template) ***REMOVED***
			Meteor.call('markAsRead', template.data._id, Meteor.userId());
			setPointsByUser();
		***REMOVED***
	***REMOVED***);
	
	Template.inspire_content.events(***REMOVED***
		'click #add-btn' : function() ***REMOVED***
			Session.set('showCreateLinkDialog' , true);
		***REMOVED*** 
	***REMOVED***);
	
	Template.inspire_content.showCreateLinkDialog = function() ***REMOVED***
		return Session.get('showCreateLinkDialog');
	***REMOVED***
	
	Template.create_link_dialog.events(***REMOVED***
		'click .cancel' : function() ***REMOVED***
			Session.set('createLinkError', null);
			Session.set('showCreateLinkDialog', false);
		***REMOVED***,
		'click .save' : function(event, template) ***REMOVED***
			Session.set('createLinkError', null);
			var title = template.find(".title").value;
			var description = template.find('.description').value;
			var url = template.find('.url').value;
			var options = ***REMOVED***
				title : title,
				description : description,
				url : url
			***REMOVED***;
			Meteor.call('createLink', options);
			setPointsByUser();
			Session.set('showCreateLinkDialog', false);
		***REMOVED***
	***REMOVED***);
	
	Template.create_link_dialog.error = function () ***REMOVED***
		return Session.get('createLinkError');
	***REMOVED***
	
	Template.link_item.getComments = function() ***REMOVED***
		var comments = Comments.find(***REMOVED***link_id : this._id***REMOVED***);		
		return comments;
	***REMOVED***
	
	Template.link_item.events(***REMOVED***
		'keydown .add-comment' : function(event, template) ***REMOVED***
			if(event.which == 13) ***REMOVED***
				
				var linkID = event.target.getAttribute('data-link');
				var linkCreator = event.target.getAttribute('data-link-creator');
				var text = template.find(".add-comment").value;
				var commentorName = Meteor.user().profile.name;
				var commentor = Meteor.userId();
				var options = ***REMOVED***
					text : text,
					commentor : commentor,
					commentor_name : commentorName,
					link_id : linkID,
					link_creator : linkCreator
				***REMOVED***;
				Meteor.call('createComment', options);
				setPointsByUser();
				event.target.value = "";
			***REMOVED***
			if(event.which == 27) ***REMOVED***
				
			***REMOVED***
		***REMOVED***,
	***REMOVED***);
	
	Template.comment.events(***REMOVED***
		'click .edit-comment' : function(event) ***REMOVED***
			event.preventDefault();
			Session.set('comment_being_edited', this._id);
		***REMOVED***,
		'click .delete-comment' : function(event) ***REMOVED***
			event.preventDefault();
			Comments.remove(this._id);
		***REMOVED***,

		'keydown .edit-comment-input' : function(event, template) ***REMOVED***
			if(event.which == 13) ***REMOVED***
				var newText = template.find('.edit-comment-input').value;
				Comments.update(this._id, ***REMOVED***$set : ***REMOVED***text : newText***REMOVED******REMOVED***);
				Session.set('comment_being_edited', null);
			***REMOVED***
			if(event.which == 27) ***REMOVED***
				Session.set('comment_being_edited', null);
			***REMOVED***
		***REMOVED***,
	***REMOVED***);
	
	Template.comment.editing = function() ***REMOVED***
		return Session.get('comment_being_edited') == this._id;
	***REMOVED***
	
	Template.comment.isMine = function() ***REMOVED***
		return this.commentor == Meteor.userId();
	***REMOVED***
	
	Template.status_list.getPointsByUser = function() ***REMOVED***
		
		return Session.get('points_by_user');
		
	***REMOVED***
				
	
