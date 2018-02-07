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
		console.log(error.responseText);
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

	function checkLoggedIn(){
		var token = sessionStorage.getItem('token');
		if(!token) {
			window.location.href = '/login.html';
		} 
	}

	function getAjaxHeader() {
		var header = { Authorization : '' };
		var token = sessionStorage.getItem('token');
		if(token) {
			header.Authorization = token;
		}

		return header;
	}

	function renderNavbar(containerId, options, template) {
		var templateLoaded = Handlebars.compile(template);
		options.user = sessionStorage.getItem('user');
		$(containerId).html(templateLoaded(options));
	}

	return {
		getParameterByName: getParameterByName,
		onError: onError,
		loadTemplates: loadTemplates,
		checkLoggedIn: checkLoggedIn,
		getAjaxHeader: getAjaxHeader,
		renderNavbar: renderNavbar
	};

})();