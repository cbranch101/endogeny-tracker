handleErrors = function(input, errorConditions, onError) {
	
	errorFound = false;
	_.each(errorConditions, function(errorCondition){
		if(errorCondition.check(input) && !errorFound) {
			message = errorCondition.get_message(input);
			onError(message);
			errorFound = true;
		}
	});
	
	return errorFound;
	
}
