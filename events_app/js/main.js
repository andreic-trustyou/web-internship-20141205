 (function() {

 	EVENT = {};

	EVENT.XHReq = function (url, handler) {
		$.ajax({
			"url": url,
			})
		.done(function(response_text, status_code) {
			handler(response_text);
		});
	};



	$(document).ready(function() {
		//
		// 	Login check
		// 
		var loggedUser = EVENT.auth.getLoggedUser();
		if (loggedUser) {
			$("div.header ul.links li span#user").text(EVENT.auth.Auth.getUserDetails(loggedUser).name).addClass("logged");
			$("div.header ul.links li:has(a#log-in)").hide();
			if (EVENT.auth.Auth.getUserDetails(loggedUser).type == 0) {
				$("div.header ul.links li:has(a#add-event)")
					.removeClass("hidden")
					.on("click", function(e) {
						$("body").append(EVENT.modal.createAddEventModal());
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
			EVENT.auth.logOut();
		});
		$("div.header ul.links li a#log-in").on("click", function(e) {
			$("body").append(EVENT.modal.createLoginModal());
			e.preventDefault();
		});

	});


})();

