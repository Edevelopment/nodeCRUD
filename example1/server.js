var app = require(__dirname + '/app'),
	port = process.env.PORT || 3001

app.listen(port, function () {
  console.log('Listening on port ', port)
})