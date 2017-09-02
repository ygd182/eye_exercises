var exerciseService = (function () {
	
	function getExercise(id) {
		return $.ajax({
		  method: "GET",
		  url: "exercise/" + id,
		});
	}

	function deleteExercise (id) {
		return $.ajax({
		  method: "DELETE",
		  url: "exercise/" + id,
		});
	}

	function getExercises() {
		return $.ajax({
		  method: "GET",
		  url: "exercise",
		});
	}

	function saveExercise(exercise) {
		return $.ajax({
		  type: "POST",
		  url: "/exercise",
		  data: exercise,
		});
	}

	function updateExercise(id, exercise) {
		return $.ajax({
		  type: "PUT",
		  url: "/exercise/" + id,
		  data: exercise,
		});
	}

	return {
		getExercise: getExercise,
		deleteExercise: deleteExercise,
		getExercises: getExercises,
		saveExercise: saveExercise,
		updateExercise:updateExercise
	}

})();