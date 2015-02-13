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
				$li_element.find("div.title").append(event.title);
				$li_element.find("div.location").append(event.location);
				$li_element.find("div.timestamp").append(
					EVENT.event.convertUTCTimestampToString(event.timestamp)
				);

				$li_element.find("div.description").append(event.description);
				$li_element.on('click', function() {
					$li_element.find("div.toggle").fadeToggle(200);
				});

				$events_ul.append($li_element);
			})
		});
	});

})();