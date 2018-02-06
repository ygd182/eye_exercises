var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

(function() {
	var template = {};
	var circleDimesion = 30;
	var exercise = null;
	var intervalFunction = null;
	var fullscreenMode = false;
	var cloneExercise = null;

	var repCounter = 1;
	var partCounter = 0;


	function showCountdown() {
		$('#clock').removeClass('hidden');
		$('#circle').hide();

    	var totalSeconds = new Date().getTime() + exercise.rest *1000;
    	$('#clock').countdown(totalSeconds, function(event) {
		  var totalHours = event.offset.totalDays * 24 + event.offset.hours;
		  $(this).html(event.strftime(totalHours + '%S sec'));
		});
	}



	function animate(exercise) {
			exercise.from = $('#span' + exercise.fromId).position();
			exercise.to = $('#span' + exercise.toId).position();
			$('#circle').css({
                transform: 'translate(' + exercise.from.left + 'px, ' + exercise.from.top  + 'px)'
            });
            setTimeout(function() {	
				
				$('#circle').show();
				if(exercise.hide) {
					$('#circle').addClass('not-shown');
				}
				$('#circle').css("transition-duration", exercise.duration + 's');
				if(exercise.blink) {
					$('#circle').addClass('blink');
					$('#circle').css("animation-duration", 1/8*exercise.blinkSpeed + 's');
				}
				$('#circle').addClass('position-transition');

				setTimeout(function() {
					$('#circle').css({
	                transform: 'translate(' + exercise.to.left + 'px, ' + exercise.to.top  + 'px)',
	            });
				}, 100);
			}, 100);
	}



	function transitionEndHandler(event){
		$('#circle').removeClass('not-shown');
    	$('#circle').removeClass('blink');
    	$('#circle').removeClass('position-transition');
    	$('#circle').css("transition-duration", 0 + 's');


    	var showBeforeStart = 0.1;
    	var previousPartExercise = exercise.parts[partCounter];
    	if(previousPartExercise.hide){
    		showBeforeStart = previousPartExercise.staticDuration;
    	}
    	partCounter++;
    	if(partCounter< exercise.parts.length) {
    		intervalFunction = setTimeout(function(){ animate(exercise.parts[partCounter]);}, showBeforeStart*1000);    	
    	} else {
    		repCounter++;
    		if(repCounter<= exercise.reps) {
    			partCounter = 0;
    			showCountdown();
	    		intervalFunction = setTimeout(function(){ animate(exercise.parts[partCounter]); }, exercise.rest *1000 + 100);    			
    		} else {
    			window.location.href = '/exercise-list.html';
    		}
    	}
    }

	function animateCircle() {
		$('#circle').on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", transitionEndHandler);
	    animate(exercise.parts[partCounter]);
	}

	function unbindTransition() {
		$('#circle').off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", transitionEndHandler);
	}

	function stopAnimationByReps() {
	    clearTimeout(intervalFunction);
	    unbindTransition();
	}

	function stopAnimation() {
		$('#circle').hide();
		$('#circle').stop();
		$('#circle').removeClass('blink');
		stopAnimationByReps();
	}


	//------------------------------------------
	function startAnimation() {
		$('.exercise-movement_wrapper').removeClass('hidden'); 
		repCounter = 1;
		partCounter = 0;
		
		animateCircle();
	}

	function enterFullScreen() {
		$('.navbar').addClass('hidden');
		$('#fullscreen-alert').addClass('hidden');
		$('.exercise-movement_wrapper').removeClass('hidden'); 
		$('.action-btn-container').removeClass('hidden'); 
	}
	//--------------------------------------------------------
	function isFullscreen() {
		return (screen.width === window.innerWidth && screen.height-10  <= window.innerHeight);
	}

	function bindWindowResize() {
		$(window).resize(function () {
			//always sotpAnimation by default
			stopAnimation();
			$('#myModal').modal();

		    waitForFinalEvent(function(){
		    	$('#myModal').modal("hide");
		        if(isFullscreen()){
		       		// this is full screen
		    		enterFullScreen();
	    		}else {
	    			$('#clock').addClass('hidden');
		    		$('.exercise-movement_wrapper').addClass('hidden'); 
					stopAnimation();
					$('.navbar').removeClass('hidden'); 
					$('#fullscreen-alert').removeClass('hidden'); 
		       }
		    }, 500, "some unique string");
		});
	}

	function bindEvents() {
		$('#clock').on('finish.countdown', function() {
    		setTimeout(function(){ $('#clock').addClass('hidden'); },100);
	    });

	    $('#start-animation-btn').on('click', function(e) {
	    	e.preventDefault();
	    	if(!$(e.target).hasClass('disabled')) {
	    		$('.action-btn-container').addClass('hidden');
	    		startAnimation();
	    	}
	    });

	    $('#return-list-btn').on('click', function(e) {
	    	e.preventDefault();
	    	window.location.href = '/exercise-list.html';
	    });
		bindWindowResize();
	}

	function renderContainers() {
		var navbarModel = {adminActive: false, listActive: false};
		var templateLoaded = Handlebars.compile(template.navbar);
		$('#navbar-container').html(templateLoaded(navbarModel));

		templateLoaded = Handlebars.compile(template.exercise);
		$('#exercise-container').html(templateLoaded());

	}

	function onSucess(data) {
		renderContainers();
		exercise = data;
		$('#start-animation-btn').removeClass('disabled');
		bindEvents();
	}

	function loadTemplates() {
		common.loadTemplates(['navbar', 'exercise']).done(function(temp1, temp2) {
			template.navbar = temp1[0];
			template.exercise = temp2[0];
			var id = common.getParameterByName('id');
			exerciseService.getExercise(id).then(onSucess,common.onError);
		});
	}

	$(document).ready(function ready(){
		common.checkLoggedIn();
		
		loadTemplates() 
			
	  if(isFullscreen()) {
       	// check if the user never left fullscreen mode
    		enterFullScreen();
		}

		
		
	});

})();
