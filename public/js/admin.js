(function() {
	var defaultExercise = {
	 
	 reps: 1,
	 
	 rest: 1,
	 name: '',
	 parts: []
	};

	var defaultPart = {
	 			fromId: 1,
	 			toId: 1,
	 			blink: false,
	 			blinkSpeed: 1,
	 			duration: 1};

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


	function getParts() {
		var part = {};
		var parts = [];

		$('.parts-list-item').each(function(index) {
			part = {};
			part.fromId = $(this).find('.from-input').val();
			part.toId = $(this).find('.to-input').val();
			part.blink = $(this).find('.blink-check').prop('checked');
			part.blinkSpeed = $(this).find('.blink-speed-input').val();
			part.duration = $(this).find('.duration-input').val();
			parts.push(part);
		});
		return parts;
	}

	function getData() {
		var exercise = defaultExercise;
		
		exercise.reps = $('#reps-input').val();
		exercise.name = $('#name-input').val();
		exercise.rest = $('#rest-input').val();
		exercise.parts = getParts();
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
		return !$('#exercise-form').data('bs.validator').hasErrors();
		//data.fromId !== data.toId /*&& data.name !== undefined && data.name !== ''*/; 
	}

	function bindEvents() {
		$(document).on('change', '.blink-check', function(e) {
			//CHEQUEAR ID
			var numId = ($(e.target).attr('id')).match(/\d+/)[0];
			if(!$(e.target).prop('checked')) {
				$('#blink-speed-input-' + numId).attr('disabled', true);
			} else {
				$('#blink-speed-input-' + numId).removeAttr('disabled');
			}
		});

		$(document).on('click', '#submit-btn', function(e) {
			e.preventDefault();

			formData = getData();
			submitExercise = formData;
			$('#exercise-form').validator('validate');

			console.log(formData);
			if(isValidForm(formData) && !$(e.target).hasClass('disabled')) {
				exerciseService.saveExercise(submitExercise).then(onSuccessSave, common.onError);
			}else {
				//alert('Some fields are missing. From and To should be different');
			}
			
		});

		$(document).on('click','#update-btn', function(e) {
			e.preventDefault();

			formData = getData();
			submitExercise = formData;
			console.log(submitExercise);
			$('#exercise-form').validator('validate');

			if(isValidForm(formData) && !$(e.target).hasClass('disabled')) {
				exerciseService.updateExercise(exerciseId, submitExercise).then(onSuccessUpdate, common.onError);
			}else {
		
			}
		});

		$(document).on('click', '#add-part-btn', function(e) {
			e.preventDefault();
			var exercise = getData();
			exercise.parts.push(defaultPart);
			$('#exercise-form').validator('update');
			
			render(exercise);
		});

		$(document).on('click', '#remove-part-btn', function(e) {
			e.preventDefault();
			var index = getIdFromParent($(e.target));
			var exercise = getData();
			exercise.parts.splice(index,1);
			render(exercise);
		});

	}

	function getIdFromParent($element) {
		var $liItem = $element.closest('li');
		var id = $liItem.data('id');
		console.log(id);
		return id;
	}


	$(document).ready(function ready(){
		var formData = null;
		var submitExercise = null;
		defaultExercise.parts.push(defaultPart);
		bindEvents();
		loadTemplates();

		
	});


	function setSelectedOption(options, id) {
		if(id){
			options[id-1].sel = true;
		}
		return options;
	}

	function fromToCheckEquals($el) {
		var numId = $el.attr('id').match(/\d+/)[0];
	    var matchValue = $('#to-input-'+ numId).val(); // foo
	    if ($el.val() === matchValue) {
	      return 'From and To should be different';
	    }
	} 


	function loadSelectArrays(data) {
		for (var i = 0; i < data.parts.length; i++) {
			 fromOptions = [ {val: 1, sel: false},
							{val: 2, sel: false},
							{val: 3, sel: false},
							{val: 4, sel: false},
							{val: 5, sel: false},
							{val: 6, sel: false},
							{val: 7, sel: false},
							{val: 8, sel: false}];

		 	toOptions = [   {val: 1, sel: false},
							{val: 2, sel: false},
							{val: 3, sel: false},
							{val: 4, sel: false},
							{val: 5, sel: false},
							{val: 6, sel: false},
							{val: 7, sel: false},
							{val: 8, sel: false}];
			data.parts[i].toOptions = setSelectedOption(toOptions, data.parts[i].toId);
			
			data.parts[i].fromOptions = setSelectedOption(fromOptions, data.parts[i].fromId);
		}

		return data;
	}

	function render(data) {
		var navbarModel = {adminActive: true, listActive: false};
		$('#navbar-container').html(Mustache.render(template.navbar, navbarModel));

		data = loadSelectArrays(data);
		
		var viewModel = { exercise : data , editMode: editMode};
		var source = template.admin;
		var templateLoaded = Handlebars.compile(source); 
		$('#admin-container').html(templateLoaded(viewModel));
 		//$('#admin-container').html(Mustache.render(template.admin, viewModel));

 		var validatorObj = {
 			disable: false,
 			custom: {
					  equals: fromToCheckEquals
					}
				};
 		$('#exercise-form').validator(validatorObj);
 		$f = $("form#exercise-form");
		$f[0].reset();
 		
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

