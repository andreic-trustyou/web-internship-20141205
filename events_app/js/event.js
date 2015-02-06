(function() {

	var event = {}

	var generateUUID = function (){
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};

	var checkStringForErrors = function(text, min_length, max_length) {
		if (typeof(text) != "string") {
			return "is not string";
		}
		if (text.length < min_length) {
			return "at least " + min_length + " characters";
		}
		if (text.length > max_length) {
			return "at most " + max_length + " characters";
		}
		return "";
	}

	event.validateFields = function(fields) {
		// nested list containing the errors.
		// format: [[field, error_message], [field, error_mmessage]]
		var error_list = []

		for (key in fields) {
			if (key == "date") {
				var date = fields[key].match(/(\d{4})-(\d{2})-(\d{2})/);
				if (!date) {
					error_list.push(["date", "Date format not valid (YYYY-MM-DD)!"]);
				} else {
					date = Date.UTC(date[1], parseInt(date[2], 10) - 1, date[3]);
					if (date <= Date.now()) {
						error_list.push(["date", "Date cannot be from the past"]);
					}
				}
			} else {
				var error = checkStringForErrors(fields[key], 5, (key == "description") ? 150 : 23);
				if (error) {
					error_list.push([key, (key[0].toUpperCase() + key.slice(1)) + " " + error + "!"]);
				}
			}
		}
		return error_list.length ? error_list : undefined;
	}

	// 
	//  Events
	// 
	// 
	// Title - required text
	// Date & time - required date& time in the future (YYYY-MM-DD)
	// Location - required text
	// Description - required text
	
	event.Event = function(title, timestamp, location, description, id) {
		if (!(this instanceof event.Event)) {
			return new event.Event(title, timestamp, location, description, id);
		}

		this.id = id || generateUUID();
		this.title = title;
		this.timestamp = timestamp;
		this.location = location;
		this.description = description;
	}

	event.Event.prototype = {
		serialize: function() {
			return JSON.stringify(this);
		}
	}

	event.deserialize = function(json_string) {
			var ev = JSON.parse(json_string);
			return new event.Event(
				ev.title,
				ev.timestamp,
				ev.location,
				ev.description,
				ev.id);
		}


	EVENT.event = event;


})();
