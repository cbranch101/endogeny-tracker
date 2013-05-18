	
	Template.inspire_content.events(***REMOVED***
		'click #add-btn' : function() ***REMOVED***
			Session.set('showCreateLinkDialog' , true);
		***REMOVED*** 
	***REMOVED***);
	
	Template.inspire_content.showCreateLinkDialog = function() ***REMOVED***
		return Session.get('showCreateLinkDialog');
	***REMOVED***
