(function() {

	var event = {}

	var generateUUID = function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
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
	};

	var daysPerMonth = function(year, month) {
		var isLeapYear = function(year) {
			if (year % 4 != 0) return false;
			if (year % 100 == 0 && year % 400 != 0) return false;

			return true;
		};

		var days = {
			1: {"lower_limit": 1, "upper_limit": 31},
			2: {"lower_limit": 1, "upper_limit": isLeapYear(year) ? 29 : 28},
			3: {"lower_limit": 1, "upper_limit": 31},
			4: {"lower_limit": 1, "upper_limit": 30},
			5: {"lower_limit": 1, "upper_limit": 31},
			6: {"lower_limit": 1, "upper_limit": 30},
			7: {"lower_limit": 1, "upper_limit": 31},
			8: {"lower_limit": 1, "upper_limit": 31},
			9: {"lower_limit": 1, "upper_limit": 30},
			10: {"lower_limit": 1, "upper_limit": 31},
			11: {"lower_limit": 1, "upper_limit": 30},
			12: {"lower_limit": 1, "upper_limit": 31}
		}

		return days[month];
	};

	var checkDateTimeForErrors = function(date_string) {
		var date = date_string.match(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/);
		if (!date) {
			return "Date & time not valid! (YYYY-MM-DD HH:MM)";
		} else {
			var year = parseInt(date[1], 10);
			var month = parseInt(date[2], 10);
			var day = parseInt(date[3], 10);
			var hour = parseInt(date[4], 10);
			var monute = parseInt(date[5], 10);
			
			if (!(month >= 1 && month <= 12)) {
				return "Month must be between [1,12]!";
			}
			var days_per_month = daysPerMonth(year, month);
			if (!(day >= days_per_month["lower_limit"] && day <= days_per_month["upper_limit"])) {
				return "Day must be between [" + days_per_month["lower_limit"] + "," + days_per_month["upper_limit"] + "]!";
			}

			if (!(hour >= 0 && hour <= 23)) {
				return "Hour must be between [0,23]!";
			}
			if (!(monute >= 0 && monute <= 59)) {
				return "Minute must be between [0,59]!";
			}

			// Convert the date to UTC by adding the timezone offset
			date = Date.UTC(date[1], parseInt(date[2], 10) - 1, date[3], date[4], date[5]) + (new Date().getTimezoneOffset() * 60 * 1000);
			if (date <= Date.now()) {
				return "Date cannot be from the past";
			}
		}
	};

	event.convertDateToUTCTimestamp = function(date_string) {
		var timestamp = date_string.match(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/);
		return timestamp ? Date.UTC(timestamp[1], parseInt(timestamp[2], 10) - 1, timestamp[3], timestamp[4], timestamp[5]) + (new Date().getTimezoneOffset() * 60 * 1000) : undefined;
	};

	event.convertUTCTimestampToString = function(timestamp) {
		var preZero = function(number) {
			return (number < 10) ? "0" + number : number;
		}
		var date = new Date(timestamp - (new Date().getTimezoneOffset() * 60 * 1000));


		var year = date.getUTCFullYear();
		var month = date.getUTCMonth();
		var day = date.getUTCDate();
		var hours = date.getUTCHours();
		var minutes = date.getUTCMinutes();

		return year + "-" + preZero(month + 1) + "-" + preZero(day) + " " + preZero(hours) + ":" + preZero(minutes);
	};

	event.validateFields = function(fields) {
		/*
			Dictionary containing errors after validating all fields.
			Format: {
				field1: error_message,
				field2: error_message,
				...
			}

		*/		
		var errors = {};

		for (key in fields) {
			if (key == "date") {
				var date_errors = checkDateTimeForErrors(fields[key]);
				if (date_errors) errors["date"] = date_errors;
			} else {
				var error = checkStringForErrors(fields[key], 5, (key == "description") ? 500 : 23);
				if (error) {
					errors[key] = (key[0].toUpperCase() + key.slice(1)) + " " + error + "!";
				}
			}
		}
		return errors;
	};

	// 
	//  Events
	// 
	// 
	// Title - required text
	// Date & time - required date & time in the future (UTC epoch timestamp)
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
	};

	event.Event.prototype = {
		serialize: function() {
			return JSON.stringify(this);
		}
	};

	event.deserialize = function(json_string) {
		var ev = JSON.parse(json_string);
		return new event.Event(
			ev.title,
			ev.timestamp,
			ev.location,
			ev.description,
			ev.id);
	};


	EVENT.event = event;


})();
