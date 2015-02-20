(function(){

	var storage = {};

	storage.addEvent = function(ev) {
		if (!(ev instanceof EVENT.event.Event)) {
			console.error("Cannot add event, item is not of Event type!");
			return;
		}

		var event_list = getRawEventList();
		event_list.push(ev.serialize());
		window.localStorage["events"] = JSON.stringify(event_list);
	};


	storage.getEvents = function() {
		storageCheck();
		var event_list = getRawEventList();
		return event_list.map(function(raw_event, index) {
			var json_event = JSON.parse(raw_event);
			return new EVENT.event.Event(
				json_event.title, 
				json_event.timestamp,
				json_event.location,
				json_event.description,
				json_event.attendees,
				json_event.id
			);
		});
	}

	storage.getNumberOfEvents = function () {
		return getRawEventList().length;
	}

	storage.updateEvent = function(event) {
		if (!(event instanceof EVENT.event.Event)) {
			console.error("Cannot update event, item is not of Event type!");
			return;
		}

		var event_list = getRawEventList().map(
			function(raw_event) {
				// NOTE: raw_event is JSON object, event is event.Event object
				var json_event = JSON.parse(raw_event);
				if (json_event.id == event.id) {
					return event.serialize();
				}
				return JSON.stringify(json_event);
			});
		window.localStorage["events"] = JSON.stringify(event_list);
	}

	var getRawEventList = function() {
		return JSON.parse(window.localStorage["events"]);
	}

	// check if the storage is JSON format
	var storageCheck = function() {
		try {
			JSON.parse(window.localStorage["events"]);
		}
		catch (e) {
			window.localStorage["events"] = "[]";
		}
	};
	
	EVENT.storage = storage;	
})();