(function() {

	var auth = {}

	auth.Auth = function() {
		var users = {
			"admin": {
				"password": "test",
				"details": {
					"name": "Admin",
					"type": 0
				}
			},
			"cata": {
				"password": "test",
				"details": {
					"name": "Catalin",
					"type": 1
				}
			}
		}

		return {
			"verifyLogIn": function (username, password) {
				if (!users[username] || password != users[username]["password"]) {
					return false;
				}
				return true;
			},
			"getUserDetails": function (username) {
				return users[username] ? users[username].details : undefined;
			}
		};
	}();


	// 
	//	Cookie 
	// 
	auth.setCookie = function(cname, cvalue, minutes) {
		cname = encodeURIComponent(cname);
		cvlue = encodeURIComponent(cvalue);
		var d = new Date();
		d.setTime(new Date().getTime() + minutes * 60 * 1000);
		expires = d.toGMTString();
		
		document.cookie = cname + "=" + cvalue + "; expires=" + expires;
	}

	auth.getCookie = function(cname) {
		var name = encodeURIComponent(cname) + "=";
		var ca = document.cookie.split(';');
		for(var i = 0 ; i < ca.length ; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
					c = c.substring(1);
			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		return "";
	} 

	auth.deleteCookie = function(cname) {
		cname = encodeURIComponent(cname);
		document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
	}

	// 
	//	Utils
	// 
	auth.getLoggedUser = function() {
		return auth.getCookie("user_logged");
	}

	auth.logInUser = function(username, logTime) {
		if (auth.getLoggedUser())
			return false;

		logTime = logTime || 10; // defaut at 10 minutes
		auth.setCookie("user_logged", username, logTime)
		return true;
	}

	auth.logOut = function() {
		auth.deleteCookie("user_logged");
	}


	EVENT.auth = auth;
})();
