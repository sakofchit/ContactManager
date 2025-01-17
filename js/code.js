var urlBase = 'http://cop4332-g1.xyz/api';
var extension = 'php';

var userId = 0;
var username = "";

/* switch between forms */
$(function() {
    $('#signUp').on('click', function(e){
        $('.login').css('display', 'none');
        $('.signup').css('display', 'inline');
        e.preventDefault();
    })
})

$(function() {
    $('#signIn').on('click', function(e){
        $('.login').css({
            'display': 'block',
            'margin-top': '18%',
        });
        $('.signup').css('display', 'none');
        e.preventDefault();
    })
})

$(function() {
    $('#btnAddContact').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.displayContacts').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.addContact').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

$(function() {
    $('#btnDisplayContacts').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.displayContacts').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

$(function() {
    $('#logo').on('click', function(e){
		$('.searchContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.displayContacts').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

$(function() {
    $('#btnSearchContacts').on('click', function(e){
		$('.displayContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.aboutProject').css('display', 'none');
		$('.searchContacts').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

$(function() {
    $('#btnInfo').on('click', function(e){
		$('.displayContacts').css('display', 'none');
		$('.addContact').css('display', 'none');
		$('.searchContacts').css('display', 'none');
		$('.aboutProject').css({
            'display': 'block',
            'margin-top': '10%',
        });
        e.preventDefault();
    })
})

window.onload=function(){
    let passA = document.getElementById("registerPassword");
	let passB = document.getElementById("confirmPassword");
	let matchResult = document.getElementById("match-result");
	let signUpButton = document.getElementById("register-submit");

	function checkPass() {
		if (passA.value != passB.value) {
			matchResult.innerText = "Passwords do not match.";
			matchResult.style.color = "red";
			signUpButton.disabled = true;
		}
		else {
			matchResult.innerText = "";
			signUpButton.disabled = false;
		}
	}
	passA.addEventListener('keyup', () => {
        if (passB.value.length != 0) checkPass();
	});

	passB.addEventListener('keyup', checkPass);

}

// remove spaces & allow using 'enter' to submit form
$(function() {
	$("input#username").on({
		keydown: function(e) {
			// 13 is ascii for enter
			if (e.which === 13)
				return document.getElementById("login-submit").click();

			// 32 is ascii for space
			if (e.which === 32)
				return false;
		},
		// remove spaces w/ regex
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#registerUsername").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("register-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#password").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("login-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#registerPassword").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("register-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})

	$("input#confirmPassword").on({
		keydown: function(e) {
			if (e.which === 13)
				document.getElementById("register-submit").click();

			if (e.which === 32)
				return false;
		},
		change: function() {
			this.value = this.value.replace(/\s/g, "");
		}
	})
});

// login
function doLogin() {
	userId = 0;
	
	var login = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	password = md5(password);
	
	document.getElementById("login-error").innerHTML = "";

	// format json payload + setup connection
	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		// Send and recieve the payload.
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);
		
		userId = jsonObject.id;
		if (userId < 1)
		{
			document.getElementById("login-error").innerHTML = jsonObject.error;
			return;
		}
		
		username = login;

		saveCookie();
	
		window.location.href = "main.html";
	}
	catch(err)
	{
		document.getElementById("login-error").innerHTML = err.message;
	}
}

function doRegister()
{
	userId = 0;
	
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("registerUsername").value;
	var password = document.getElementById("registerPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var tempPass = password;
	
	password = md5(password);
	confirmPassword = md5(confirmPassword);
	
	document.getElementById("register-error").innerHTML = "";

	var jsonPayload = '{ "regFirstname" : "' + firstName + '", "regLastname" : "' + lastName + '", "regUsername" : "' + login + '", "regPassword" : "' + password + '", "regPasswordConf" : "' + confirmPassword + '" }';
	var url = urlBase + '/Register.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);

		if (jsonObject.error != "")
		{
			document.getElementById("register-error").innerHTML = jsonObject.error;
			return;
		}

		document.getElementById("username").value = login;
		document.getElementById("password").value = tempPass;
		doLogin();
	}
	catch(err)
	{
		document.getElementById("register-error").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "username=" + username + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function doLogout()
{
	userId = 0;
	username = "";
	document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");

	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if (tokens[0] == "username")
		{
			username = tokens[1];
		}
		else if (tokens[0] == "userId")
		{
			userId = parseInt(tokens[1].trim());
		}
	}
	
	if (userId < 0)
	{
		return null;
	}

	return userId;
}
