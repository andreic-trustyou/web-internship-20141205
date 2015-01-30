(function() {


	createModal = function () {
		var $modal = $(
			"<div class='modal_overlay'>" +
				"<div class='wrapper'>" +
				"</div>" +
			"</div>"
		);

		$modal
			.on("click", function(e) {
				$modal.remove();
			})
			.keydown(function(event) {
				if (event.which == 13) {
					$modal.find("div.dialog ul li button").click();
				}
				else if(event.which == 27) {
					$modal.remove();
				}
			})
		$modal.find("div.wrapper")
			.on("click", function(e) {
				e.stopPropagation();
			});

		$modal.dismiss = function (handler) {
			$modal.animate(
				{"opacity": 0},
				200,
				function() {
					handler();
					$modal.remove();
				}
			);
		}

		return $modal;
	}

	createLoginModal = function () {
		$modal = createModal();

		XHReq("templates/modal_login.html", function(responseText) {
			$modal.find("div.wrapper").append(responseText);

			$modal.find("button")
				.on("click", function() {
					var username = $modal.find("#username").prop("value");
					var password = $modal.find("#password").prop("value");

					if (Auth.verifyLogIn(username, password)) {
						$modal.dismiss(function() {
							logInUser(username);
							window.location.replace($modal.find("button").attr("href"));
						});
					}
					else {
						$modal.find("div.log_in input").prop("value", "");
						$modal.find("#username").select();
						$modal.find("div.log_in li div.info").text("Invalid username/password.")
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




			$modal.find("#username").select();
			$modal.animate(
				{"opacity": 1},
				500
			)
		})

		return $modal;
	}

	createAddEventModal = function () {
		$modal = createModal();

		function isValidString(text, min_length, max_length) {
			if (typeof(text) != "string") {
				return false;
			}
			if (text.length < min_length) {
				return false;
			}
			if (text.length > max_length) {
				return false;
			}
			return true;
		}

		function validateFields() {
			var error_message = "Text must be between 4 and 20 characters!";
			var error = "";

			// TODO

			return error ? error : true;
		}

		XHReq("templates/modal_add_event.html", function(responseText) {
			$modal.find("div.wrapper").append(responseText);

			$modal.find("button")
				.on("click", function() {
					var title = $modal.find("#title").prop("value");
					var location = $modal.find("#location").prop("value");
					var description = $modal.find("#description").prop("value");
					var date = $modal.find("#date").prop("value");

					var error_message = validateFields();

					if (error_message) {
						$modal.dismiss(function() {
							window.location.replace($modal.find("button").attr("href"));
						});
					}
					else {
						$modal.find("div.log_in input").prop("value", "");
						$modal.find("#username").select();
						$modal.find("div.log_in li div.info").text(error_message)
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


			$modal.find("input:eq(0)").select();
			$modal.animate(
				{"opacity": 1},
				500
			)
		})

		return $modal;
	}

})();
