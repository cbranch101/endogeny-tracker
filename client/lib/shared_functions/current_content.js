	contentTypes = [
		
		{
			id : 'home',
			button_name : 'Home',
		},
		{
			id : 'inspire',
			button_name : 'Inspire',
		},
		
	];
	
	setCurrentContentTypes = function() {
		
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
