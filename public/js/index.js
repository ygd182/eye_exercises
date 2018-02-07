//index.js
(function() {
	var template = {};

	function render() {
		var navbarModel = {adminActive: false, listActive: false};

		common.renderNavbar('#navbar-container', navbarModel, template.navbar);

		var templateLoaded = Handlebars.compile(template.list);
		$('#list-container').html(templateLoaded());

	}

	function loadTemplates() {
		common.loadTemplates(['index', 'navbar']).done(function(temp1, temp2) {
			template.list = temp1[0];
			template.navbar = temp2[0];
			render();
		});
	}

	$(document).ready(function ready(){
		common.checkLoggedIn();
		loadTemplates();
	});

})();