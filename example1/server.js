var app = require(__dirname + '/app');

if (process.env.NODE_ENV === 'production') {
	var port = 8082;
} else {
	var port = 3000;
}

app.listen(port, function () {
  console.log('Listening on port ', port)
})
