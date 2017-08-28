(function() {
	var circleDimesion = 30;
	var exercise = null;
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

	function animateCircle(from, to, duration, blinkSpeed) {
		$('#circle').css(from);
		var blink = true;
		if(blink) {
			$('#circle').addClass('blink');
			$('#circle').css("animation-duration", blinkSpeed+ 's');
		}
		$('#circle').animate({
	        "left": to.left /*+ '%'*/,
	        "top": to.top /*+ '%'*/
	    }, duration*1000, function complete(){
	    	$('#circle').removeClass('blink');
	    	//$('#circle').css(from);
	    });
	}

	function onSucess(data) {
		exercise = data;
		var fromPos = $('#span' + exercise.fromId).position();
		var toPos = $('#span' + exercise.toId).position();
		animateCircle(fromPos, toPos, exercise.duration, exercise.blinkSpeed);
	}

	function onError() {
		console.log('error');
	}

	$(document).ready(function ready(){
		getExercise('59a38c10a3d63c1270a2b4e8').then(onSucess,onError);
		/*var exercise = {};
		exercise.from = 2;
		exercise.to = 8;
		exercise.duration = 2000;
		var from = {};
		var to = {};
		from.top = $('#span' + exercise.from).position().top; 
		from.left = $('#span' + exercise.from).position().left;
		to.top = $('#span' + exercise.to).position().top; 
		to.left = $('#span' + exercise.to).position().left;

		
		animateCircle(from, to, exercise.duration, 1);*/

		$(window).resize(function(){
			var from = {};
			/*from.top = $('#span' + exercise.from).position().top; 
			from.left = $('#span' + exercise.from).position().left*/
			$('#circle').css(from);
			$('#circle').stop();
			$('#circle').removeClass('blink');
		});

		//getData();
			
	});

})();

