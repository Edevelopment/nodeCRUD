"use strict"
var CrudController = require('./crud');
var CommentModel = require('../../models/comment');
class CommentsController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new CommentModel;
	}
}

module.exports = CommentsController;
