"use strict"
var DB = require('./db');
class BaseModel extends DB{
    constructor() {
        super();
        this.addHelpers();
        this.pullFilesFields = {
        }
    }

    addHelpers() {
        this.helpers = {};

        let moment = require('moment');
        this.helpers.dateTime = moment;

        this.helpers.strings = require('../helpers/strings');
        this.helpers.file = require('../helpers/file');
        this.helpers.mail = require('../helpers/mail');
        this.helpers.fs = require('fs');
    }


    // Подготовка данных для отображения
    pushValue(field, value) {
        if (typeof this['push' + this.helpers.strings.ucfirst(field) + 'Value'] === 'function') {
            value = this['push' + this.helpers.strings.ucfirst(field) + 'Value'](value);
        }

        return value;
    }

    // Подготовка данных для сохранения
    pullValue(field, value) {
        if (typeof this['pull' + this.helpers.strings.ucfirst(field) + 'Value'] === 'function') {
            value = this['pull' + this.helpers.strings.ucfirst(field) + 'Value'](value);
        }
    
        this.pulledData[field] = value;
        return this;
    }

	// Так выглядит геттер
	get name() {
		return '';
	}

	// Так выглядит сеттер
	set name(newName) {
		this.name = newName;      
	}

    pullData(data) {
        
        for (let key in data) {
            if (!this.pullFields.hasOwnProperty(key)) continue;

            this.pullValue(key, data[key]);
        }

        let dt = new this.helpers.dateTime();
        this.pullValue('updated', dt.format('x'));

        return this;
    }   

    pushData(data)  {
        let result = {};

        for (let key in this.pushFields) {

            if (!this.pushFields.hasOwnProperty(key)) continue;
            result[key] = this.pushValue(key, data[key]);
        }

        return result;
    }

    addCreatedData() {
        let dt = new this.helpers.dateTime();
        this.pullValue('created', dt.format('x'));
        return this;
    }

    pullImages(image, callback, errCallback){
         let decodedImg = decodeBase64Image(imgB64Data);
         let imageBuffer = decodedImg.data;
         let type = decodedImg.type;
         let extension = mime.extension(type);
         let fileName =  "image." + extension;
         try{
               fs.writeFileSync("./runtime/images/" + fileName, imageBuffer, 'utf8', (err) => {
                    callback();
               });
            }
         catch(err){
            console.log(err);
            return errCallback();
         }
    }

    pullFiles(fields, callback, errCallback) {
        let dt = new this.helpers.dateTime();
        let i = 0;
        let pullFileFieldsCount = Object.keys(this.pullFilesFields).length;
        if (!pullFileFieldsCount) {
            return callback(fields);
        }
        for (let field in this.pullFilesFields) {
            let runtimeFolder = 'images';
            var mime = require('mime');
            let decodedImg = this.helpers.file.decodeBase64Image(fields[field]);
            let imageBuffer = decodedImg.data;
            let type = decodedImg.type;
            let extension = mime.getExtension(type);
            let fileName =  dt.format('x') + '.' + extension;
            let newpath = './runtime/' + runtimeFolder + '/';
            this.helpers.fs.writeFile(newpath + fileName, imageBuffer, 'utf8', (err) => {
                fields[field] = fileName;
                if (i == pullFileFieldsCount - 1) {
                    return callback(fields);
                }
                i++;
            });
        }
    }
}

module.exports = BaseModel;
