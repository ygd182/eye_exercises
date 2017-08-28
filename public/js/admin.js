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

	function saveExercise(exercise) {
		console.log(exercise);
		$.ajax({
		  type: "POST",
		  url: "/exercise",
		  data: exercise,
		}).done(function( msg ) {
		    console.log("saved" , msg );
		});
	}

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
		return exercise;
	}

	$(document).ready(function ready(){
		var formData = null;
		var submitExercise = null;
		$('#submit-btn').on('click', function(e) {
			e.preventDefault();

			formData = getData();
			submitExercise = formData;
			submitExercise.from = getElementPositionPercentaje('span' + formData.fromId);
			submitExercise.to = getElementPositionPercentaje('span' + formData.toId);


			saveExercise(submitExercise);
			
		});
	});

})();

