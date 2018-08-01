"use strict"
class File {
	constructor() {
	}
	
	decodeBase64Image(dataString) {
	  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
	    response = {};

	  if (matches.length !== 3) {
	  	this.res.sendStatus(404);
	  }

	  response.type = matches[1];
	  response.data = new Buffer(matches[2], 'base64');

	  return response;
	}
}

module.exports = new File;