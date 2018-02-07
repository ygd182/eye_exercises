//login.js
(function() {
	var email = '';

	function getData() {
		var loginData = {};
		
		loginData.email = $('#email-input').val();
		loginData.password = $('#password-input').val();

		return loginData;
	}

	function onSuccessLogin(data) {
	    console.log("logged in" , data );
	    if(data.token) {
	    	sessionStorage.setItem('token', data.token);
	    	sessionStorage.setItem('user', email);
	      window.location.href = '/index.html';
	    }
	    
	}


	function bindEvents() {
		$(document).on('click', '.btn-signin', function(e) {
			e.preventDefault();

			formData = getData();
			//$('#exercise-form').validator('validate');

			console.log(formData);
			//if(isValidForm(formData) && !$(e.target).hasClass('disabled')) {
				email= formData.email;
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
