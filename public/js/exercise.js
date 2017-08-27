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

	function animateCircle(from, to, duration, blinkSpeed) {
		$('#circle').css(from);
		$('#circle').addClass('blink');
		$('#circle').css("animation-duration", blinkSpeed+ 's');
		$('#circle').animate({
	        "left": to.left,
	        "top": to.top
	    }, duration, function complete(){
	    	$('#circle').removeClass('blink');
	    	$('#circle').css(from);
	    });
	}

	$(document).ready(function ready(){
		var exercise = {};
		exercise.from = 2;
		exercise.to = 8;
		exercise.duration = 2000;
		var from = {};
		var to = {};
		from.top = $('#span' + exercise.from).position().top; 
		from.left = $('#span' + exercise.from).position().left;
		to.top = $('#span' + exercise.to).position().top; 
		to.left = $('#span' + exercise.to).position().left;

		
		animateCircle(from, to, exercise.duration, 1);

		$(window).resize(function(){
			var from = {};
			from.top = $('#span' + exercise.from).position().top; 
			from.left = $('#span' + exercise.from).position().left
			$('#circle').css(from);
			$('#circle').stop();
			$('#circle').removeClass('blink');
		});

		//getData();
			
	});

})();

