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
		var event_list = getRawEventList();
		return event_list.map(function(element, index) {
			return JSON.parse(element);
		});
	}

	var getRawEventList = function() {
		storageCheck();
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