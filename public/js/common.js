var common = (function() {
	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function onError(error) {
		console.log(error);
	}
	/*
	*@ param array[String]
	* returns promise
	*/
	function loadTemplates(names) {
		var promiseArray = [];
		for (var i = 0; i < names.length; i++) {
			promiseArray.push($.get('templates/' + names[i] + '.html'));
		}
		//$.when(...promiseArray)
		return $.when.apply($, promiseArray);
	}

	function topFunction() {
	    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
	    document.documentElement.scrollTop = 0; // For IE and Firefox
	}

	return {
		getParameterByName: getParameterByName,
		onError: onError,
		loadTemplates: loadTemplates
	}

})();