(function() {
	// 
	//  Read events 
	// 	
	$(document).ready(function() {
		var event_list = EVENT.storage.getEvents();

		// sort the events by date
		event_list.sort(
			function(first, second) {
				return first.timestamp - second.timestamp;
			}
		);

		var $events_ul = $("div.event_list ul");

		EVENT.XHReq("templates/event_element.html", function(responseText) {
			event_list.forEach(function(event, index) {
				var $li_element = $(
					"<li>" +
					responseText + 
					"</li>"
				);

				$li_element.find("div.event").attr("id", event.id);
				
				$li_element.find("div.title").append(document.createTextNode(event.title));
				$li_element.find("div.timestamp").append(document.createTextNode(
					EVENT.event.convertUTCTimestampToString(event.timestamp)
				));
				$li_element.find("div.location").append(document.createTextNode(event.location));



				$li_element.find("div.description")
					.removeClass('hidden')
					.append(document.createTextNode(event.description));

				var logged_user = EVENT.auth.getLoggedUser();
				if (logged_user) {
					$li_element.find("div.attendees").removeClass('hidden').append(document.createTextNode(event.attendees.length));

					// Add the Register/Deregister button
					$register_element = $li_element.find("div.register");
					$register_element.removeClass("hidden");
					if (event.isAttending(logged_user)) {
						$register_element.addClass("off");
						$register_element.text("Deregister")
					} else {
						$register_element.addClass("on");
						$register_element.text("Register")
					}
					$register_element.on("click", function() {
						event.toggleUserRegistration(logged_user);
						EVENT.storage.updateEvent(event);
						window.location.replace("./");
					});


					// Display the number of attendees for each event
					var $attendees = $("<div class='attendees_hover'></div>")
					$li_element.find("div.attendees").mousemove(function(event) {
						var vertical =  2 * parseInt($attendees.css('border-top-width').replace('px', '')) + 2 * parseInt($attendees.css('padding-top').replace('px', '')) + $attendees.height();
						var horizontal =  2 * parseInt($attendees.css('border-left-width').replace('px', '')) + 2 * parseInt($attendees.css('padding-left').replace('px', '')) + $attendees.width();

						$attendees.css({
							"left": event.clientX - horizontal,
							"top": event.clientY - vertical
						});
					})

					event.attendees.forEach(function(elem) {
						var $p_elem = $("<p></p>")
						$attendees.append($p_elem);
						$p_elem.append(document.createTextNode(elem.username));
					});

					$li_element.find("div.attendees").hover(
						function() {
							$li_element.find("div.attendees").append($attendees);
							$attendees.show();
						},
						function() {
							$attendees.hide();

						});
				}





				$li_element.find("div.toggle_more_less").hover(
					function() {
						$li_element.find("div.event").toggleClass("hover");
					},
					function() {
						$li_element.find("div.event").toggleClass("hover");
					});
				$li_element.find("div.toggle_more_less").on('click', function() {
					$li_element.find("div.toggle").slideToggle(300).toggleClass('toggle_off');

					$li_element.find("div.toggle_more_less").toggleClass("more");
					$li_element.find("div.toggle_more_less").toggleClass("less");
				});

				$events_ul.append($li_element);
			})
		});
	});

})();