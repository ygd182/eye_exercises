//admin.js
(function() {
	var template = {};

	function onDeleteSucess (data) {
		userService.getUsers().then(render, common.onError);
	}

	function deleteUser() {
		userService.deleteUser(deleteId).then(onDeleteSucess ,common.onError);
	}

	function getIdFromParent($element) {
		var $liItem = $element.closest('li');
		var id = $liItem.data('id');
		console.log(id);
		return id;
	}

	function bindEvents() {
		$(document).on('click','.delete-user', function(e) {
			e.preventDefault();
			modalView.show();
			deleteId = getIdFromParent($(e.target));
		});

		$(document).on('click','.edit-user', function(e) {
			e.preventDefault();
			var id = getIdFromParent($(e.target));
			//window.location.href = '/user-creator.html?id=' + id;
		});

	}


	function render(data) {
		var navbarModel = {adminActive: true, listActive: false ,creatorActive: false};
		var viewModel = { userArray : data /*, isAdminHelper: isAdminHelper*/};

		common.renderNavbar('#navbar-container', navbarModel, template.navbar);

		var templateLoaded = Handlebars.compile(template.list);
		$('#list-container').html(templateLoaded(viewModel));

		modalView.init('#js-modal-container', template.modal);
 		modalView.options({ body: 'Are you sure that you want to delete the selected user?'});
		modalView.bindConfirmAction(deleteUser);
		modalView.render();


	}

	function loadTemplates() {
		common.loadTemplates(['admin', 'navbar', 'modal']).done(function(temp1, temp2, temp3) {
			template.list = temp1[0];
			template.navbar = temp2[0];
			template.modal = temp3[0];
			userService.getUsers().then(render, common.onError);
		});
	}

	$(document).ready(function ready(){
		common.checkLoggedIn();
		loadTemplates();
		bindEvents();
	});

})();