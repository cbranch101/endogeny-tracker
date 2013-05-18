	contentTypes = [
		
		***REMOVED***
			id : 'home',
			button_name : 'Home',
		***REMOVED***,
		***REMOVED***
			id : 'inspire',
			button_name : 'Inspire',
		***REMOVED***,
		
	];
	
	setCurrentContentTypes = function() ***REMOVED***
		
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
