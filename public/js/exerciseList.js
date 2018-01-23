//exercise-list.js

(function() {
	var template = {};
	var deleteId = null;

	function onDeleteSucess (data) {
		exerciseService.getExercises().then(render, common.onError);
	}

	function getIdFromParent($element) {
		var $liItem = $element.closest('li');
		var id = $liItem.data('id');
		console.log(id);
		return id;
	}

	function deleteExercise() {
		exerciseService.deleteExercise(deleteId).then(onDeleteSucess ,common.onError);
	}

	function bindEvents() {
		$(document).on('click','.delete-exercise', function(e) {
			e.preventDefault();
			modalView.show();
			deleteId = getIdFromParent($(e.target));
		});

		$(document).on('click','.edit-exercise', function(e) {
			e.preventDefault();
			var id = getIdFromParent($(e.target));
			window.location.href = '/admin.html?id=' + id;
		});

		$(document).on('click','.view-exercise', function(e) {
			e.preventDefault();
			var id = getIdFromParent($(e.target));
			window.location.href = '/exercise.html?id=' + id;
		});
	}

	function render(data) {
		var viewModel = { exercises : data };
		var navbarModel = {adminActive: false, listActive: true};
		var templateLoaded = Handlebars.compile(template.navbar);
		$('#navbar-container').html(templateLoaded(navbarModel));

		templateLoaded = Handlebars.compile(template.exerciseList);
		$('#exercises-container').html(templateLoaded(viewModel));

 		modalView.init('#js-modal-container', template.modal);
 		modalView.options({ body: 'Are you sure that you want to delete the selected exercise?'});
		modalView.bindConfirmAction(deleteExercise);
		modalView.render();
	}

	function loadTemplates() {
		common.loadTemplates(['exercise-list', 'navbar', 'modal']).done(function(temp1, temp2, temp3) {
			template.exerciseList = temp1[0];
			template.navbar = temp2[0];
			template.modal = temp3[0];
			exerciseService.getExercises().then(render, common.onError);
		});
	}

	$(document).ready(function ready(){
		bindEvents();
		loadTemplates();
	});

})();
