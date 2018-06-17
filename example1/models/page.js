"use strict"
var BaseModel = require('./basemodel');
class PageModel extends BaseModel {
    constructor() {
    	super();
    	this.tablename = 'pages';
    }
}

module.exports = PageModel;
