(function() {


	// 
	//  Events
	// 
	// 
	// Title - required text
	// Date & time - required date& time in the future
	// Location - required text
	// Description - required text
	
	var Event = function(title, timestamp, location, description) {
		if (typeof(title) != "string") {
			console.error("Error: title is not string!");
			return null;
		}

		if (typeof(location) != "string") {
			console.error("Error: location is not string!");
			return null;
		}

		if (typeof(description) != "string") {
			console.error("Error: description is not string!");
			return null;
		}

		if (timestamp <= Date.now()) {
			console.error("Error: the date must be in the future");
			return null;
		}

		return {
			"getTitle": function() {
				return title;
			},
			"getDate": function() {
				return title;
			},
			"getLocation": function() {
				return location;
			},
			"getDescription": function() {
				return description;
			}
		}
	}

}();
