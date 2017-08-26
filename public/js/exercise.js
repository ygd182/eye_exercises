(function() {
	var circleDimesion = 40;
	var defaultExercise = {
	 from: null,
	 to: null,
	 blink: false,
	 blinkSpeed: 0,
	 reps: 0,
	 duration: 0
	};

	function getExercise(exercise) {
		console.log(exercise);
		$.ajax({
		  method: "GET",
		  url: "some.php",
		}).done(function( data ) {
		    alert( "Data Saved: " + msg );
		});
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

	function animateCircle(top, left, duration, blinkSpeed) {
		$('#circle').addClass('blink');
		$('#circle').css("animation-duration", blinkSpeed+ 's');
		$('#circle').animate({
	        "left": left,
	        "top": top
	    }, duration, function complete(){
	    	$('#circle').removeClass('blink');
	    });
	}

	$(document).ready(function ready(){
		var exercise = {};
		exercise.from = 8;
		exercise.duration = 2000;
		var top = $('#span' + exercise.from).position().top - circleDimesion/2; 
		var left = $('#span' + exercise.from).position().left - circleDimesion/2-8;
		animateCircle(top, left, exercise.duration, 1);

		//getData();
			
	});

})();

