   (function() {

	XHReq = function (url, handler) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				handler(xmlhttp.responseText);
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	};



	$(document).ready(function() {
		//
		// 	Login check
		// 
		var loggedUser = getLoggedUser();
		if (loggedUser) {
			$("div.header ul.links li span#user").text(Auth.getUserDetails(loggedUser).name).addClass("logged");
			$("div.header ul.links li:has(a#log-in)").hide();
			if (Auth.getUserDetails(loggedUser).type == 0) {
				$("div.header ul.links li:has(a#add-event)")
					.removeClass("hidden")
					.on("click", function(e) {
						$("body").append(createAddEventModal());
						e.preventDefault();
					});
			}
		}
		else {
			$("span#user").text("guest");
			$("div.header ul.links li:has(a#log-out)").hide();
		}


		// 
		//	Log in/out controller
		// 
		$("div.header ul.links li a#log-out").on("click", function(e) {
			logOut();
		});
		$("div.header ul.links li a#log-in").on("click", function(e) {
			$("body").append(createLoginModal());
			e.preventDefault();
		});
	});


})();

