//admin.js
(function() {
	var template = {};

	function render(data) {
		var navbarModel = {adminActive: false, listActive: false};
		var viewModel = { userArray : data };

		common.renderNavbar('#navbar-container', navbarModel, template.navbar);

		var templateLoaded = Handlebars.compile(template.list);
		$('#list-container').html(templateLoaded(viewModel));

	}

	function loadTemplates() {
		common.loadTemplates(['admin', 'navbar']).done(function(temp1, temp2) {
			template.list = temp1[0];
			template.navbar = temp2[0];
			userService.getUsers().then(render, common.onError);
		});
	}

	$(document).ready(function ready(){
		common.checkLoggedIn();
		loadTemplates();
	});

})();