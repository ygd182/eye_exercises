(function() {
	var defaultExercise = {
	 fromId: null,
	 toId: null,
	 blink: false,
	 blinkSpeed: 1,
	 reps: null,
	 duration: null,
	 rest: null,
	 name: ''
	};

	var fromOptions = [ {val: 1, sel: false},
						{val: 2, sel: false},
						{val: 3, sel: false},
						{val: 4, sel: false},
						{val: 5, sel: false},
						{val: 6, sel: false},
						{val: 7, sel: false},
						{val: 8, sel: false}];

	var toOptions = [   {val: 1, sel: false},
						{val: 2, sel: false},
						{val: 3, sel: false},
						{val: 4, sel: false},
						{val: 5, sel: false},
						{val: 6, sel: false},
						{val: 7, sel: false},
						{val: 8, sel: false}];

	var exerciseId = null;

	var template = {};
	var editMode = false;

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
		exercise.blink = $('#blink-check').prop('checked');
		exercise.blinkSpeed = $('#blink-speed-input').val();
		exercise.duration = $('#duration-input').val();
		exercise.reps = $('#reps-input').val();
		exercise.name = $('#name-input').val();
		exercise.rest = $('#rest-input').val();
		return exercise;
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

	function onSuccessUpdate(msg) {
		modalView.show();
	    console.log("saved" , msg );
	    //restorePage();
	}

	function onSuccessSave(msg) {
		modalView.show();
	    console.log("saved" , msg );
	    //restorePage();
	}

	function isValidForm(data) {
		return data.fromId !== data.toId && data.name !== undefined && data.name !== ''; 
	}

	function bindEvents() {
		$(document).on('change', '#blink-check', function(e) {
			if(!$(e.target).prop('checked')) {
				$('#blink-speed-input').attr('disabled', true);
			} else {
				$('#blink-speed-input').removeAttr('disabled');
			}
		});

		$(document).on('click', '#submit-btn', function(e) {
			e.preventDefault();
			//$('#exercise-form').validator();
			formData = getData();
			submitExercise = formData;
			/*submitExercise.from = getElementPositionPercentaje('span' + formData.fromId);
			submitExercise.to = getElementPositionPercentaje('span' + formData.toId);*/
			$('#exercise-form').validator('validate');

			if(isValidForm(formData) && !$(e.target).hasClass('disabled')) {
				exerciseService.saveExercise(submitExercise).then(onSuccessSave, common.onError);
			}else {
				alert('Some fields are missing. From and To should be different');
			}
			
		});

		$(document).on('click','#update-btn', function(e) {
			e.preventDefault();

			formData = getData();
			submitExercise = formData;
			/*submitExercise.from = getElementPositionPercentaje('span' + formData.fromId);
			submitExercise.to = getElementPositionPercentaje('span' + formData.toId);*/
			console.log(submitExercise);
			$('#exercise-form').validator('validate');
			if(isValidForm(formData) && !$(e.target).hasClass('disabled')) {
				exerciseService.updateExercise(exerciseId, submitExercise).then(onSuccessUpdate, common.onError);
			}else {
				alert('Some fields are missing. From and To should be different');
			}
		});

	}

	$(document).ready(function ready(){
		var formData = null;
		var submitExercise = null;
		bindEvents();
		loadTemplates();

		
	});


	function setSelectedOption(options, id) {
		if(id){
			options[id-1].sel = true;
		}
	}

	function render(data) {
		setSelectedOption(toOptions, data.toId);
		setSelectedOption(fromOptions, data.fromId);
		var viewModel = { exercise : data , editMode: editMode, fromOptions: fromOptions, toOptions: toOptions};
		var navbarModel = {adminActive: true, listActive: false};

 		$('#admin-container').html(Mustache.render(template.admin, viewModel));
 		$('#exercise-form').validator();
 		$('#navbar-container').html(Mustache.render(template.navbar, navbarModel));
 		modalView.init('#js-modal-container', template.modal);
 		modalView.options({has_cancel: false, body: 'Exercise saved.', title: 'Notification', confirm_color: 'primary', confirm_text: 'Dismiss'});
		modalView.bindConfirmAction(restorePage);
		modalView.render();
	}

	function getExerciseData() {
		exerciseId = common.getParameterByName('id');
		if(exerciseId) {
			editMode = true;
			exerciseService.getExercise(exerciseId).then(render, onError);
		} else {
			render(defaultExercise);
		}
	}

	function loadTemplates() {
		common.loadTemplates(['admin', 'navbar', 'modal']).done(function(temp1, temp2, temp3) {
			template.admin = temp1[0];
			template.navbar = temp2[0];
			template.modal = temp3[0];
			getExerciseData();
		});
	}

})();

