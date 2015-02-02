(function(){

	var storage = {};

	storage.addEvent = function(ev) {
		if (!(ev instanceof EVENT.event.Event)) {
			console.error("Cannot add event, item is not of Event type!");
			return;
		}

		var event_list = storage.getEvents();
		event_list.push(ev.serialize());
		window.localStorage["events"] = JSON.stringify(event_list);
	};


	storage.getEvents = function() {
		try {
			var event_list = JSON.parse(window.localStorage["events"]);
			return event_list.map(function(e, i) {
				return JSON.parse(e);
			});
		}
		catch (e) {
			console.error(e.stack);
		}

	}


	
	EVENT.storage = storage;	
})();