(function() {

	var modal = {}

	modal.createModal = function () {
		var $modal = $(
			"<div class='modal_overlay'>" +
				"<div class='wrapper'>" +
				"</div>" +
			"</div>"
		);

		$modal
			.on("click", function(e) {
				$modal.dismiss(null, 100);
			})
			.keydown(function(event) {
				if (event.which == 13) {
					$modal.find("div.dialog ul li button").click();
				}
				else if(event.which == 27) {
					$modal.dismiss(null, 100);
				}
			})
		$modal.find("div.wrapper")
			.on("click", function(e) {
				e.stopPropagation();
			});

		$modal.dismiss = function (handler, duration) {
			$modal.animate(
				{"opacity": 0},
				(duration || 200),
				function() {
					typeof handler === "function" && handler();
					$modal.remove();
				}
			);
		}

		return $modal;
	}

	modal.createLoginModal = function () {
		$modal = modal.createModal();

		EVENT.XHReq("templates/modal_login.html", function(responseText) {
			$modal.find("div.wrapper").append(responseText);

			$modal.find("button")
				.on("click", function() {
					var username = $modal.find("#username").prop("value");
					var password = $modal.find("#password").prop("value");

					if (EVENT.auth.Auth.verifyLogIn(username, password)) {
						$modal.dismiss(function() {
							EVENT.auth.logInUser(username);
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

	modal.createAddEventModal = function () {
		$modal = modal.createModal();




		EVENT.XHReq("templates/modal_add_event.html", function(responseText) {
			$modal.find("div.wrapper").append(responseText);

			$modal.find("button")
				.on("click", function() {
					$modal.find("li div.label").removeClass("wrong");
					$modal.find("li input").removeClass("wrong");

					var title = $modal.find("#title").prop("value");
					var location = $modal.find("#location").prop("value");
					var description = $modal.find("#description").prop("value");
					var date = $modal.find("#date").prop("value");

					var errors = EVENT.event.validateFields({
						"title": title,
						"location": location,
						"description": description,
						"date": date
					});
					var error_fields = Object.keys(errors);
					if (!error_fields.length) {
						$modal.dismiss(function() {
							var ev = new EVENT.event.Event(title, EVENT.event.convertDateToUTCTimestamp(date), location, description);
							EVENT.storage.addEvent(ev);
							window.location.replace($modal.find("button").attr("href"));
						});
					}
					else {
						// add class 'wrong' to corresponding labels
						error_fields.forEach(function(e, i) {
								$modal.find("li div.label")
									.filter("." + e)
									.addClass("wrong")
									.parent()
									.find("input")
									.addClass("wrong")
									.prop("value", "");

							});

						// select the first wrong field
						$modal.find("li div.label.wrong")
							.parent()
							.find("input")
							.eq(0)
							.select();

						// place the error message
						$modal.find("div.dialog li div.info")
							.text(errors[$modal.find("li input.wrong:eq(0)").attr("id")])
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

	EVENT.modal = modal;

})();
