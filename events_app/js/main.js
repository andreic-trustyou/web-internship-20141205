   (function() {

	var Auth = function() {
		users = {
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
	function setCookie(cname, cvalue, minutes) {
		cname = encodeURIComponent(cname);
		cvlue = encodeURIComponent(cvalue);
		var d = new Date();
		d.setTime(new Date().getTime() + minutes * 60 * 1000);
		expires = d.toGMTString();
		
		document.cookie = cname + "=" + cvalue + "; expires=" + expires;
	}

	function getCookie(cname) {
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

	function deleteCookie(cname) {
		cname = encodeURIComponent(cname);
		document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
	}

	function getLoggedUser(username) {
		if (getCookie(username)) {
			return True;
		}
		return false;
	}

	// 
	//	Utils
	// 
	function getLoggedUser() {
		return getCookie("user_logged");
	}

	function logInUser(username, logTime) {
		if (getLoggedUser())
			return false;

		logTime = logTime || 10; // defaut at 10 minutes
		setCookie("user_logged", username, logTime)
		return true;
	}

	function logOut() {
		deleteCookie("user_logged");
	}


	// 
	//  Events
	// 
	// 
	// Title - required text
	// Date & time - required date& time in the future
	// Location - required text
	// Description - required text
	var Event = function(title, timestamp, location, description) {
		if (typeof(title) != "string") {
			console.error("Error: title is not string!");
			return null;
		}

		if (typeof(location) != "string") {
			console.error("Error: location is not string!");
			return null;
		}

		if (typeof(description) != "string") {
			console.error("Error: description is not string!");
			return null;
		}

		if (timestamp <= Date.now()) {
			console.error("Error: the date must be in the future");
			return null;
		}
		var title = title;
		var timestamp = timestamp;
		var location = location;
		var description = description;

		return {
			"getTitle": function() {
				return title;
			},
			"getDate": function() {
				return title;
			},
			"getLocation": function() {
				return location;
			},
			"getDescription": function() {
				return description;
			}
		}

	}




	$(document).ready(function() {
		//
		// 	Login check
		// 
		var loggedUser = getLoggedUser();
		$("div.header ul.links li:has(a#add-event)").hide();
		if (loggedUser) {
			$("div.header ul.links li span#user").text(Auth.getUserDetails(loggedUser).name).addClass("logged");
			$("div.header ul.links li:has(a#log-in)").hide();
			if (Auth.getUserDetails(loggedUser).type == 0) {
				$("div.header ul.links li:has(a#add-event)").show();
			}
		}
		else {
			$("div.header ul.links li span#user").text("guest");
			$("div.header ul.links li:has(a#log-out)").hide();
		}


		// 
		//	Log in/out controller
		// 
		$("div.header ul.links li a#log-out").on("click", function(e) {
			logOut();
		});
		$("div.header ul.links li a#log-in").on("click", function(e) {
			$("body")
				.append(
					createModalDialog($(this).attr("href"))
			);
			$("div.modal_overlay input#username").select();
			$("div.modal_overlay").animate(
				{"opacity": 1},
				500
			)
			e.preventDefault();
		});


		function createModalDialog(follow_up_location) {
			return $("<div></div>")
				.addClass("modal_overlay")
				.on("click", function(e) {
					$("div.modal_overlay").remove();
				})
				.append(
					$("<div></div>")
						.addClass("log_in")
						.on("click", function(e) {
							e.stopPropagation();
						})
					.append(
						$("<h1></h1>").text("Log In")
					)
					.append(
						$("<ul></ul>")
							.append(
								$("<li></li>")
									.append(
										$("<div></div>")
											.addClass("info")
											.text("")
									)
							)
							.append(
								$("<li></li>")
									.append(
										$("<div></div>")
											.addClass("label")
											.text("Username:")
									)
									.append(
										$("<input>")
											.prop("id", "username")
									)
							).append(
								$("<li></li>")
									.append(
										$("<div></div>")
											.addClass("label")
											.text("Password:")
									)
									.append(
										$("<input>")
											.prop("type", "password")
											.prop("id", "password")
									)
							).append(
								$("<li></li>")
									.append(
										$("<button>")
											.prop("type", "button")
											.text("Submit")
											.on("click", function() {
												var username = $("div.log_in input#username").prop("value");
												var password = $("div.log_in input#password").prop("value");

												if (Auth.verifyLogIn(username, password)) {
													$("div.modal_overlay").animate(
														{"opacity": 0},
														200,
														function() {
															console.log("Logged in!");
															logInUser(username);
															window.location.replace(follow_up_location);
														}
													)
													
												}
												else {
													$("div.log_in input").prop("value", "");
													$("div.modal_overlay input#username").select();
													$("div.log_in li div.info").text("Invalid username/password.")
														.animate(
															{"width": "+=20px"},
															30
														).animate(
															{"width": "-=20px"},
															30
														).animate(
															{"width": "-=20px"},
															30
														).animate(
															{"width": "+=20px"},
															30
														);
												}
											})
									)
							)
					)
					.keypress(function(event) {
						if (event.which == 13) {
							$("div.modal_overlay div.log_in ul li button").click()
						}
					})
				)
		}

	});




})();



























