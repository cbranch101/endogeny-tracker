	
	Meteor.subscribe("links");
	Meteor.subscribe("users", function(){
		users = Meteor.users.find();
		Session.set('total_users', users.count() - 1);
	});
	Meteor.subscribe("comments");
	
	var setPointsByUser = function() {
		Meteor.call('getPointsPerUser', function(err, results){
			
			var rawPointsByUser = results;		
			
			var indexedPointsByUser = {}
			_.map(rawPointsByUser, function(pointsForUser){
				indexedPointsByUser[pointsForUser._id] = pointsForUser;
			});
		
			
			var results = Meteor.users.find();
			
			var users = results.collection.docs;
			
			pointsByUser = _.map(users, function(user){
				
				var points = indexedPointsByUser.hasOwnProperty(user._id) ? indexedPointsByUser[user._id]['total_points'] : 0;
				return {
					user_name : user.profile.name,
					points : points,
				};
			});
			
			Session.set('points_by_user', pointsByUser);
			
		});
	}
		
	var setTotalUsers = function() {
		
/* 		Session.set('total_users', totalUsers); */
	}
	
	Meteor.startup(function () {
		// if the current content for the dashboard is null
		// set it to the default 
		if(Session.get('current_content') == null) {
	   		Session.set('current_content', 'home');
		}
		setCurrentContentTypes();
		setPointsByUser();
	});
	
	// Returns an event_map key for attaching "ok/cancel" events to
	// a text input (given by selector)
	var okcancel_events = function (selector) {
	  return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
	};
	
	// Creates an event handler for interpreting "escape", "return", and "blur"
	// on a text field and calling "ok" or "cancel" callbacks.
	var make_okcancel_handler = function (options) {
	  var ok = options.ok || function () {};
	  var cancel = options.cancel || function () {};
	
	  return function (evt) {
	    if (evt.type === "keydown" && evt.which === 27) {
	      // escape = cancel
	      cancel.call(this, evt);
	
	    } else if (evt.type === "keyup" && evt.which === 13 ||
	               evt.type === "focusout") {
	      // blur/return/enter = ok/submit if non-empty
	      var value = String(evt.target.value || "");
	      if (value)
	        ok.call(this, value, evt);
	      else
	        cancel.call(this, evt);
	    }
	  };
	};
	
	// Finds a text input in the DOM by id and focuses it.
	var focus_field_by_id = function (id) {
	  var input = document.getElementById(id);
	  if (input) {
	    input.focus();
	    input.select();
	  }
	};
		
	var contentTypes = [
		
		{
			id : 'home',
			button_name : 'Home',
		},
		{
			id : 'inspire',
			button_name : 'Inspire',
		},
		
	];
	
	var setCurrentContentTypes = function() {
		
		var isActive = function(contentType) {
			return Session.get('current_content') == contentType;
		}
		
		currentContentTypes = _.map(contentTypes, function(contentType){
			var listClass = isActive(contentType['id']) ? "class = active" : '';
			contentType['list_class'] = listClass;
			return contentType;
		});
				
		Session.set('current_content_types', currentContentTypes);
		
	}
		
	Template.main.isLoggedIn = function() {
		return Meteor.userId() != null;	
	};
	
	Template.nav_bar.contentTypes = function() {
		return Session.get('current_content_types');
	}
		
	Template.nav_bar.events({
		'click .nav_button' : function(event) {
			var contentType = event.target.getAttribute('data-content-type');
			Session.set('current_content', contentType);
			setCurrentContentTypes();
		}
	});
			
	Template.content.showInspireContent = function() {
		return Session.get('current_content') == 'inspire';
	}
	
	Template.content.showHomeContent = function() {
		return Session.get('current_content') == 'home';
	}
	
	var setReadPercentage = function(link) {
		var totalUsers = Session.get('total_users');
		var read_percentage = link.readers == 0 ? 0 : link.readers.length / totalUsers;
		read_percentage = read_percentage * 100;
		read_percentage = Math.round(read_percentage);
		read_percentage = read_percentage + '%';
		link.read_percentage = read_percentage;
		link.percentage_text = link.readers.length + " of " + totalUsers;
		return link;
	}
	
	Template.link_list.getLinks = function() {
		var links = Links.find();
		
		if(links.count() > 0) {
			index = 0;
			links = links.map(function(link){
				link.index = index;
				link.created_by_me = link.creator == Meteor.userId();
				link['read_by_me'] = _.contains(link.readers, Meteor.userId());
				link = setReadPercentage(link);
				link.has_readers = link.readers.length != 0;
				if(link.url.substr(0, 4) != 'http') {
					link.url = 'http://' + link.url;
				}
				index++;
				return link;
			});
		}
		
								
		return links;
	}
		
	Template.link_item.events({
		'click .delete-btn' : function(event, template) {
			Links.remove(template.data._id);
		},
		'click .mark-read-btn' : function(event, template) {
			Meteor.call('markAsRead', template.data._id, Meteor.userId());
			setPointsByUser();
		}
	});
	
	Template.inspire_content.events({
		'click #add-btn' : function() {
			Session.set('showCreateLinkDialog' , true);
		} 
	});
	
	Template.inspire_content.showCreateLinkDialog = function() {
		return Session.get('showCreateLinkDialog');
	}
	
	Template.create_link_dialog.events({
		'click .cancel' : function() {
			Session.set('createLinkError', null);
			Session.set('showCreateLinkDialog', false);
		},
		'click .save' : function(event, template) {
			Session.set('createLinkError', null);
			var title = template.find(".title").value;
			var description = template.find('.description').value;
			var url = template.find('.url').value;
			var options = {
				title : title,
				description : description,
				url : url
			};
			Meteor.call('createLink', options);
			setPointsByUser();
			Session.set('showCreateLinkDialog', false);
		}
	});
	
	Template.create_link_dialog.error = function () {
		return Session.get('createLinkError');
	}
	
	Template.link_item.getComments = function() {
		var comments = Comments.find({link_id : this._id});		
		return comments;
	}
	
	Template.link_item.events({
		'keydown .add-comment' : function(event, template) {
			if(event.which == 13) {
				
				var linkID = event.target.getAttribute('data-link');
				var linkCreator = event.target.getAttribute('data-link-creator');
				var text = template.find(".add-comment").value;
				var commentorName = Meteor.user().profile.name;
				var commentor = Meteor.userId();
				var options = {
					text : text,
					commentor : commentor,
					commentor_name : commentorName,
					link_id : linkID,
					link_creator : linkCreator
				};
				Meteor.call('createComment', options);
				setPointsByUser();
				event.target.value = "";
			}
			if(event.which == 27) {
				
			}
		},
	});
	
	Template.comment.events({
		'click .edit-comment' : function(event) {
			event.preventDefault();
			Session.set('comment_being_edited', this._id);
		},
		'click .delete-comment' : function(event) {
			event.preventDefault();
			Comments.remove(this._id);
		},

		'keydown .edit-comment-input' : function(event, template) {
			if(event.which == 13) {
				var newText = template.find('.edit-comment-input').value;
				Comments.update(this._id, {$set : {text : newText}});
				Session.set('comment_being_edited', null);
			}
			if(event.which == 27) {
				Session.set('comment_being_edited', null);
			}
		},
	});
	
	Template.comment.editing = function() {
		return Session.get('comment_being_edited') == this._id;
	}
	
	Template.comment.isMine = function() {
		return this.commentor == Meteor.userId();
	}
	
	Template.status_list.getPointsByUser = function() {
		
		return Session.get('points_by_user');
		
	}
				
	
