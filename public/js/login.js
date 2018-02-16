//login.js
(function() {

	function getData() {
		var loginData = {};
		
		loginData.email = $('#email-input').val();
		loginData.password = $('#password-input').val();

		return loginData;
	}

	function onSuccessLogin(data) {    
	    if(data.success) {
	    	console.log("logged in" , data );
	    	sessionStorage.setItem('token', data.token);
	    	sessionStorage.setItem('user', data.email);
	      window.location.href = '/index.html';
	    } else {
	    	console.log("log error" , data );
	    	onErrorLogin(data);
	    }
	}

	function onErrorLogin(data) {
		$('.error-msg').show();
	}


	function bindEvents() {
		$(document).on('click', '.btn-signin', function(e) {
			e.preventDefault();

			formData = getData();
			//$('#exercise-form').validator('validate');

			console.log(formData);
			//if(isValidForm(formData) && !$(e.target).hasClass('disabled')) {

				loginService.login(formData).then(onSuccessLogin, common.onError);
		/*	}else {
				//alert('Some fields are missing. From and To should be different');
			}*/
			
		});
	}

	function checkLogout(){
		var token = sessionStorage.getItem('token');
		if(token) {
			//logout
			sessionStorage.removeItem('token');
		} 
	}

	$(document).ready(function ready(){
		checkLogout();
		bindEvents();
	});

})();
