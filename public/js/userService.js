//loginService.js

var userService = (function () {
	
	/*function getExercise(id) {
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


	function updateExercise(id, exercise) {
		return $.ajax({
		  type: "PUT",
		  url: "/exercise/" + id,
		  data: exercise,
		});
	}

	function getExercises() {
		return $.ajax({
		  method: "GET",
		  url: "exercise",
		});
	}

*/



	function login(loginData) {
		return $.ajax({
		  type: "POST",
		  url: "/user/login",
		  data: loginData,
		});
	}


	function logout() {
		return $.ajax({
		  type: "POST",
		  url: "/user/logout"
		});
	}


	return {
		login: login
	}

})();