//loginService.js

var userService = (function () {
	
	function getUser(id) {
		return $.ajax({
		  method: "GET",
		  url: "user/" + id,
		});
	}

	function deleteUser (id) {
		return $.ajax({
		  method: "DELETE",
		  url: "user/" + id,
		});
	}

	function updateUser(id, user) {
		return $.ajax({
		  type: "PUT",
		  url: "/user/" + id,
		  data: user,
		});
	}

	function getUsers() {
		return $.ajax({
		  method: "GET",
		  url: "user",
		});
	}

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