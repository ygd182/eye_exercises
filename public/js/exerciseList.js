//exercise-list.js

(function() {
	var actionsDiv = '<div class="btn-group pull-right">'
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
	}


	function onDeleteSucess (data) {
		if(data){
			alert('Exercise: ' + data._id + 'deleted');
		}
		
		exerciseService.getExercises().then(onSuccess, common.onError);
	}

	function getIdFromParent($element) {
		var $liItem = $element.closest('li');
		var id = $liItem.data('id');
		console.log(id);
		return id;
	}

	$(document).ready(function ready(){
		$(document).on('click','.delete-exercise', function(e) {
			e.preventDefault();
			var id = getIdFromParent($(e.target));
			exerciseService.deleteExercise(id).then(onDeleteSucess ,common.onError)
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

		exerciseService.getExercises().then(onSuccess, common.onError);


	});

})();
