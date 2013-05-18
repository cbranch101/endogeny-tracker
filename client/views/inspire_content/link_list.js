	
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
