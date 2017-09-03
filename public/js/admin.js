(function() {
	var defaultExercise = {
	 fromId: null,
	 toId: null,
	 blink: false,
	 blinkSpeed: 0,
	 reps: 0,
	 duration: 0,
	 name: ''
	};

	var exerciseId = null;

	function getPercentage(value, total) {
		return value / total * 100;
	}

	function getElementPositionPercentaje(id) {
		var pos = {};
		var $element = $('#'+id);
		var position = $element.position();
		var height = $element.parent().height();
		var width = $element.parent().width();
		pos.top = getPercentage(position.top, height);
		pos.left = getPercentage(position.left, width);
		return pos;
	}

	function getData() {
		var exercise = defaultExercise;
		exercise.fromId = $('#from-input').val();
		exercise.toId = $('#to-input').val();
		exercise.blink = $('#blink-check').val();
		exercise.blinkSpeed = $('#blink-speed-input').val();
		exercise.duration = $('#duration-input').val();
		exercise.reps = $('#reps-input').val();
		exercise.name = $('#name-input').val();
		exercise.rest = $('#rest-input').val();
		return exercise;
	}

	function setData(exercise) {
		$('#from-input').val(exercise.fromId);
		$('#to-input').val(exercise.toId);
		$('#blink-check').prop('checked', exercise.blink);
		$('#blink-speed-input').val(exercise.blinkSpeed );
		$('#duration-input').val(exercise.duration);
		$('#reps-input').val(exercise.reps);
		$('#name-input').val(exercise.name);
		$('#rest-input').val(exercise.rest);
	}

	function loadForm() {
		exerciseId = common.getParameterByName('id');
		if(exerciseId) {
			$('#submit-btn').parent().hide();
			$('#update-btn').parent().show();
			exerciseService.getExercise(exerciseId).then(setData, onError);
		}
	}

	function onError(data) {
		common.onError(data);
		restorePage();
	}

	function restorePage() {
		/*$('#exercise-form').trigger("reset");
		$('#submit-btn').parent().show();
		$('#update-btn').parent().hide();
		exerciseId = null;*/
		//window.history.pushState({}, document.title, "/admin.html");
		window.location.href = '/exercise-list.html';
	}

	function onSuccessUpdate(msg, ) {
		alert('Exercise Updated');
	    console.log("saved" , msg );
	    restorePage();
	}

	function onSuccessSave(msg) {
		alert('Exercise Saved');
	    console.log("saved" , msg );
	    restorePage();
	}

	function isValidForm(data) {
		return data.fromId !== data.toId && data.name !== undefined && data.name !== ''; 
	}

	$(document).ready(function ready(){
		$('#update-btn').parent().hide();
		var formData = null;
		var submitExercise = null;
		loadForm();

		$('#submit-btn').on('click', function(e) {
			e.preventDefault();

			formData = getData();
			submitExercise = formData;
			submitExercise.from = getElementPositionPercentaje('span' + formData.fromId);
			submitExercise.to = getElementPositionPercentaje('span' + formData.toId);

			if(isValidForm(formData)) {
				exerciseService.saveExercise(submitExercise).then(onSuccessSave, common.onError);
			}else {
				alert('Some fields are missing');
			}
			
		});

		$('#update-btn').on('click', function(e) {
			e.preventDefault();

			formData = getData();
			submitExercise = formData;
			submitExercise.from = getElementPositionPercentaje('span' + formData.fromId);
			submitExercise.to = getElementPositionPercentaje('span' + formData.toId);

			if(isValidForm(formData)) {
				exerciseService.updateExercise(exerciseId, submitExercise).then(onSuccessUpdate, common.onError);
			}else {
				alert('Some fields are missing');
			}
		});
	});

})();

