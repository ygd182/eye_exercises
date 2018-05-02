//admin.js
(function() {
	var template = {};
	var selectedUser = {};
	var userList = [];
	var showEdition = false;
	var index = null;

	function onDeleteSucess (data) {
		userService.getUsers().then(render, common.onError);
	}

	function deleteUser() {
		userService.deleteUser(deleteId).then(onDeleteSucess ,common.onError);
	}

	function getFormData() {
		var user = {};
		
		user.email = $('#email-input').val();
		user.password = $('#password-input').val();
		user.passwordRepeat = $('#password-input-repeat').val();
		user.role = $('#role-select').val();
		return user;
	}

	function setFormData(user) {

		
	  $('#email-input').val(user.email);

		$('#role-select').val(user.role);

	}

	function editUser() { 
		selectedUser = userList[index];
		console.log(selectedUser);
		setFormData(selectedUser);
	}

	function getIdFromParent($element) {
		var $liItem = $element.closest('li');
		var id = $liItem.data('id');
		console.log(id);
		return id;
	}

	function getIndexFromParent($element) {
		var $liItem = $element.closest('li');
		var id = $liItem.data('index');
		console.log(id);
		return id;
	}

	function onSaveSucess(data) {
		console.log(data);
		if(data.success) {
			userService.getUsers().then(render, common.onError);
		} else {
			console.log("log error" , data );
	    onErrorSaveUser(data);
		}
	}

	function onEditSucess(data) {
		console.log(data);
		if(data._id = editId) {
			userService.getUsers().then(render, common.onError);
		} else {
			console.log("log error" , data );
	    onErrorSaveUser(data);
		}
	}

	function onErrorSaveUser(data) {
		$('.error-msg').show();
	}

	function isValidForm(data) {
		console.log(!$('#user-form').data('bs.validator').hasErrors());
		return !$('#user-form').data('bs.validator').hasErrors();
	}

	function showSaveOrUpdate() {
		if(showEdition) {
			$('.btn-save-user').hide();
			$('.btn-update-user').show();
			$('.form-legend').html('<b>Update User</b> ' + selectedUser.email);
		} else {
			$('.btn-save-user').show();
			$('.btn-update-user').hide();
			$('.form-legend').html('<b>Create User</b>');
		}

	}

	function bindEvents() {
		$(document).on('click','.delete-user', function(e) {
			e.preventDefault();
			modalView.show();
			deleteId = getIdFromParent($(e.target));
		});

		$(document).on('click','.edit-user', function(e) {
			e.preventDefault();
			showEdition = true;
			showSaveOrUpdate();
			editId = getIdFromParent($(e.target));
			index = getIndexFromParent($(e.target));
			editUser();
			//window.location.href = '/user-creator.html?id=' + id;
		});

		$(document).on('click','.btn-save-user', function(e) {
			e.preventDefault();
			var user = getFormData();
			console.log(user);

			$('#user-form').validator('validate');

			if(isValidForm(user) && !$(e.target).hasClass('disabled')) {
				userService.saveUser(user).then(onSaveSucess, common.onError);
			}
		});

		$(document).on('click','#add-user-btn', function(e) {
			e.preventDefault();
			showEdition = false;
			$('#user-form')[0].reset();
			showSaveOrUpdate();

		});


		$(document).on('click','.btn-update-user', function(e) {
			e.preventDefault();
			var user = getFormData();
			console.log(user);

			$('#user-form').validator('validate');

			if(isValidForm(user) && !$(e.target).hasClass('disabled')) {
				userService.updateUser(editId, user).then(onEditSucess, common.onError);
			}
		});

	}


	function render(data) {
		userList = data;
		var navbarModel = {adminActive: true, listActive: false ,creatorActive: false, isAdmin: common.isAdmin()};
		var viewModel = { userArray : data};

		common.renderNavbar('#navbar-container', navbarModel, template.navbar);

		var templateLoaded = Handlebars.compile(template.list);
		$('#list-container').html(templateLoaded(viewModel));

		modalView.init('#js-modal-container', template.modal);
 		modalView.options({ body: 'Are you sure that you want to delete the selected user?'});
		modalView.bindConfirmAction(deleteUser);
		modalView.render();

 		$('#user-form').validator();
 		$('.btn-update-user').hide();
 		/*$f = $("form#user-form");
		$f[0].reset();*/

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