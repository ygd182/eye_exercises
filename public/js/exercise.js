(function() {
	var circleDimesion = 30;
	var exercise = null;
	var intervalFunction = null;
	var fullscreenMode = false;
	var cloneExercise = null;
	var defaultExercise = {
	 from: null,
	 to: null,
	 blink: false,
	 blinkSpeed: 0,
	 reps: 0,
	 duration: 0
	};

	function getExercise(id) {
		return $.ajax({
		  method: "GET",
		  url: "exercise/" + id,
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

	function animateCircle(exercise) {
		if(exercise.reps > 0) {
			$('#circle').css(exercise.from);
			$('#circle').show();
			if(exercise.blink) {
				$('#circle').addClass('blink');
				$('#circle').css("animation-duration", 1/8*exercise.blinkSpeed + 's');
			}
			$('#circle').animate({top: exercise.to.top +'px', left: exercise.to.left +'px'}, exercise.duration*1000, function complete(){
		    	$('#circle').removeClass('blink');
		    	cloneExercise = jQuery.extend(true, {}, exercise);
		    	cloneExercise.reps--;
		    	//animateCircle(cloneExercise);
		    	intervalFunction = setTimeout(function(){ animateCircle(cloneExercise) }, exercise.rest *1000);
		    	//$('#circle').css(from);
		    });
		}
		
	}

	function stopAnimationByReps() {
	    clearTimeout(intervalFunction);
	}

	function stopAnimation() {
		$('#circle').hide();
		$('#circle').stop();
		$('#circle').removeClass('blink');
		stopAnimationByReps();
	}

	function onSucess(data) {
		exercise = data;
		
		$(window).on('resize', function(e){
		    if(screen.width === window.innerWidth && screen.height === window.innerHeight){
		    		// this is full screen
		    		$('.exercise-movement_wrapper').removeClass('hidden'); 
					$('#fullscreen-alert').hide();
					exercise.from = $('#span' + exercise.fromId).position();
					exercise.to = $('#span' + exercise.toId).position();
					animateCircle(exercise);
		       }else {
		    		$('.exercise-movement_wrapper').addClass('hidden'); 
					stopAnimation();

					$('#fullscreen-alert').show();
		       }
		 });

	}

	function onError() {
		console.log('error');
	}

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	$(document).ready(function ready(){
		
		var id = getParameterByName('id');
		getExercise(id).then(onSucess,onError);
			
	});

})();

