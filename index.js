/*
 * 	https://github.com/expressjs/express/blob/master/examples/mvc/index.js
 */

// Собственно сам фреймворк
var express = require('../..');
// Штука, которая будет хранить логи
var logger = require('morgan');
// Пока хз
var path = require('path');
// Штука, которая создаст нам сессию для пользователей
var session = require('express-session');
// Позволяем создавать свои кастомные REQUEST методы помимо GET, POST. 
// Например DELETE или UPDATE, может для крада пригодится
var methodOverride = require('method-override');

// Подключаем все модели 
// Подключаем все контроллеры

// Подключаем все view 
// Говорим что файлы вьюшек будут иметь расширение ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Пока не совсем понял что это
app.response.message = function(msg){
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// Запускаем логирование
if (!module.parent) app.use(logger('dev'));

// Сервим статику
app.use(express.static(path.join(__dirname, 'public')));

// Эту часть тоже пока не понял
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});

// Поддержка сессии   ------------------------ где хранится сессия?
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here' // Ключ безопастности, хммммммм, а что если брать ключ у ssl сертификата?
}));

app.use(express.urlencoded({ extended: true }))

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// Обработка серверных ошибок
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).render('5xx');
});

// Обработка клиентских ошибок
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

app.listen(3000);
console.log('Express started on port 3000');


// берем request uri и делаем такую же магию с превращением uri в controller action и id (по хорошему вынести в отдельный файл)