"use strict"
var CrudController = require('./crud');
var NotificationModel = require('../../models/notification');
class NotificationsController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new NotificationModel;
	}

	sendTestMailAction() {
		this.model.sendMessageToAdmin();
		this.view.sendStatus(200);
	}
}

module.exports = NotificationsController;
