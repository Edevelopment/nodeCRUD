"use strict"
class Strings {
	ucfirst(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

module.exports = new Strings;