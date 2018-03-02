//login.js
(function() {

	function checkRememberMe() {
 
    if (localStorage.chkbx && localStorage.chkbx != '') {
        $('#remember_me').attr('checked', 'checked');
        $('#email-input').val(localStorage.username);
        $('#password-input').val(localStorage.pass);
    } else {
        $('#remember_me').removeAttr('checked');
        $('#email-input').val('');
        $('#password-input').val('');
    }
  }

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
	    	sessionStorage.setItem('role', data.role);
	      window.location.href = '/index.html';
	    } else {
	    	console.log("log error" , data );
	    	onErrorLogin(data);
	    }
	}

	function onErrorLogin(data) {
		$('.error-msg').show();
	}


	function bindRememberMe() {
		$(document).on('click', '#remember_me', function() {
        if ($('#remember_me').is(':checked')) {
            // save username and password
            localStorage.username = $('#email-input').val();
            localStorage.pass = $('#password-input').val();
            localStorage.chkbx = $('#remember_me').val();
        } else {
            localStorage.username = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
        }
    });
	}

	function bindLogin() {
		$(document).on('click', '.btn-signin', function(e) {
			e.preventDefault();
			formData = getData();
			userService.login(formData).then(onSuccessLogin, common.onError);
		});
	}

	function bindEvents() {
		bindLogin();
		bindRememberMe();
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
		checkRememberMe();
		bindEvents();
	});

})();
