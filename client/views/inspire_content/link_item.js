	
	Template.link_item.events({
		'click .delete-btn' : function(event, template) {
			Links.remove(template.data._id);
		},
		'click .mark-read-btn' : function(event, template) {
			Meteor.call('markAsRead', template.data._id, Meteor.userId());
			setPointsByUser();
		},
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
		}
	});
	
	Template.link_item.getComments = function() {
		var comments = Comments.find({link_id : this._id});		
		return comments;
	}
	