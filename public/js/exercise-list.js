//exercise-list.js

(function() {

	function getExercises() {
		return $.ajax({
		  method: "GET",
		  url: "exercise",
		});
	}


	function onSucess(data) {
		var list = '';
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
			list = list + '<a class="list-group-item" href="/exercise.html?id=' + data[i]._id + '">'+ data[i].name +'</la>';
		}
		console.log(list);
		$('#exercise-list').html(list);
	}

	function onError() {
		console.log('error');
	}

	$(document).ready(function ready(){

		getExercises().then(onSucess, onError);
	});

})();



