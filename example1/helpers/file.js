"use strict"
class File {
	constructor(res, req) {
		let path = require('path');
		let fs = require('fs');
		let multer  = require('multer');

		this.storage = multer.diskStorage({
			destination: function(req, file, callback) {
				callback(null, 'runtime/images')
			},
			filename: function(req, file, callback) {
				callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
			}
		});

		this.multer = multer;
	}

	checkMagicNumbers() {
		let MAGIC_NUMBERS = {
			jpg: 'ffd8ffe0',
			jpg1: 'ffd8ffe1',
			png: '89504e47',
			gif: '47494638'
		}

		return (magic == MAGIC_NUMBERS.jpg ||
				magic == MAGIC_NUMBERS.jpg1 || 
				magic == MAGIC_NUMBERS.png || 
				magic == MAGIC_NUMBERS.gif);

	}

	uploadImage(field, callback) {
		let upload = multer({
			storage: this.storage
			fileFilter: function(req, file, callback) {
				var ext = path.extname(file.originalname)
				if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
					this.res.sendStatus(404);
				}
				callback();
			}
		}).single(field);
		upload(this.req, this.res, callback());
	}
}

module.exports = new File;