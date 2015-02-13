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








		// 
		// DEBUG 
		// 

		var randInt = function(max, min) {
			min = min || 0;
			return Math.round(Math.random() * (max - min) + min);
		}
		var randFloat = function(max, min) {
			min = min || 0;
			return Math.random() * (max - min) + min;
		}
		var randWord = function(max_chars, min_chars) {
			min_chars = min_chars || 0;
			var str = "";
			var len = randInt(max_chars, min_chars);
			for (var i = 0 ; i < len ; i++) {
				str += String.fromCharCode(randInt(122, 97));
			}
			return str;
		}
		var randText = function(num_words, word_length, delta) {
			delta = delta || 0.2;
			word_length = word_length || 6;
			var text = "";

			var word;
			for (var i = 0 ; i < num_words ; i++) {
				word = randWord(word_length, word_length);
				text += " " + word;
				word_length = Math.round(
					(
						(delta / 2) * 
						randInt(
							word_length * (1 + delta / 2),
							word_length * (1 - delta / 2)
							) + 
						word_length * (1 - (delta / 2))
					) 
				);
			}
			return text.trim();
		}

		$("#debug a.clear_storage").on('click', function(e) {
			window.localStorage["events"] = "[]";
		});
		$("#debug a.add_dummy_event").on('click', function(e) {
			EVENT.storage.addEvent(
				new EVENT.event.Event(
					"Dummy Event #" + randInt(1000),
					EVENT.event.convertDateToUTCTimestamp(randInt(2020, 2015) + "-" + randInt(12, 1) + "-" + randInt(31, 1) + " " + randInt(23, 0) + ":" + randInt(59, 0)),
					randWord(7, 1),
					randText(randInt(130, 5), 5, 0.8),
					[{"name": "cata"}, {"name": "admin"}]
				)
			);
		});	

	});





})();

