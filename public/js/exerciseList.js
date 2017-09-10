//exercise-list.js

(function() {
	var template = {};
	var deleteId = null;

	/*var actionsDiv = '<div class="btn-group pull-right">'
				+'<button type="button" class="btn btn-default btn view-exercise"><i class="glyphicon glyphicon-eye-open"></i></button>'
                +'<button type="button" class="btn btn-default btn edit-exercise"><i class="glyphicon glyphicon-pencil"></i></button>'  
                +'<button type="button" class="btn btn-default btn delete-exercise"><i class="glyphicon glyphicon-trash"></i></button>'
                +'</div>'


	function onSuccess(data) {
		var list = '';
		for (var i = 0; i < data.length; i++) {
			list = list + '<li class="list-group-item" data-id="' + data[i]._id +'"><a href="/exercise.html?id=' + data[i]._id + '">'+ data[i].name +'</a>'+actionsDiv +'</li>';
		}

		$('#exercise-list').html(list);
	}*/


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

 		$('#exercises-container').html(Mustache.render(template.exerciseList, viewModel));
 		$('#navbar-container').html(Mustache.render(template.navbar, navbarModel));
 		modalView.init('#js-modal-container', template.modal);
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

		//exerciseService.getExercises().then(onSuccess, common.onError);
		loadTemplates();

	});

})();
