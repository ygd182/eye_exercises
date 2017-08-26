(function() {
	var defaultExercise = {
	 from: null,
	 to: null,
	 blink: false,
	 blinkSpeed: 0,
	 reps: 0,
	 duration: 0
	};

	function saveExercise(exercise) {
		console.log(exercise);
		/*$.ajax({
		  method: "POST",
		  url: "some.php",
		  data: exercise,
		}).done(function( msg ) {
		    alert( "Data Saved: " + msg );
		});*/
	}

	function getData() {
		var exercise = defaultExercise;
		exercise.from = $('#from-input').val();
		exercise.to = $('#to-input').val();
		exercise.blink = $('#blink-check').val();
		exercise.blinkSpeed = $('#blink-speed-input').val();
		exercise.duration = $('#duration-input').val();
		exercise.reps = $('#reps-input').val();
		return exercise;
	}

	$(document).ready(function ready(){
		$('#submit-btn').on('click', function(e) {
			e.preventDefault();
			saveExercise(getData());
			
		});
	});

})();

