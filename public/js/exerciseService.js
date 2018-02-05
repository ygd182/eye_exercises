var exerciseService = (function () {
	
	
	function getExercise(id) {
		return $.ajax({
			headers: common.getAjaxHeader(),
		  method: "GET",
		  url: "exercise/" + id,
		});
	}

	function deleteExercise (id) {
		return $.ajax({
			headers: common.getAjaxHeader(),
		  method: "DELETE",
		  url: "exercise/" + id,
		});
	}

	function getExercises() {
		return $.ajax({
			headers: common.getAjaxHeader(),
		  method: "GET",
		  url: "exercise",
		});
	}

	function saveExercise(exercise) {
		return $.ajax({
			headers: common.getAjaxHeader(),
		  type: "POST",
		  url: "/exercise",
		  data: exercise,
		});
	}

	function updateExercise(id, exercise) {
		return $.ajax({
			headers: common.getAjaxHeader(),
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