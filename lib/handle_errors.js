handleErrors = function(input, errorConditions, onError) ***REMOVED***
	
	errorFound = false;
	_.each(errorConditions, function(errorCondition)***REMOVED***
		if(errorCondition.check(input) && !errorFound) ***REMOVED***
			message = errorCondition.get_message(input);
			onError(message);
			errorFound = true;
		***REMOVED***
	***REMOVED***);
	
	return errorFound;
	
***REMOVED***
