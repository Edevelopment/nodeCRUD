"use strict"
class Mail {
	constructor() {
		let nodemailer = require('nodemailer');

		let settings = require('../configs.json')['mail'][process.env.NODE_ENV];
	    this.transporter = nodemailer.createTransport(settings);
	}

	send(to, subject, html) {
		let mailOptions = {
			from: '"DevelopEd" <ed@example.com>',
			to: to,
			subject: subject,
			html: html
		};

		this.transporter.sendMail(mailOptions, (error, info) => {
			if (error) return console.log(error);
			console.log('Message sent: %s', info.messageId);
		});
	}
}

module.exports = new Mail;