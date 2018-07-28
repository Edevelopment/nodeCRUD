"use strict"
class File {
	constructor() {
		this.imageTypes = {
        	gif  : true,
        	jpg  : true,
        	jpeg : true,
        	png  : true,
		};
		
		this.fileTypes = {
        	doc  : true,
        	docx : true,
        	gif  : true,
        	jpg  : true,
        	jpeg : true,
        	pdf  : true,
        	png  : true,
        	ppt  : true,
        	pptx : true,
        	xls  : true,
        	xlsx : true
		};
	}
}

module.exports = new File;