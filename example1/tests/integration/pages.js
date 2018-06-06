/*
  GET '/' должен редиректить на '/home'
  GET '/home' должен быть успешным
  GET '/home' должен в теле ответа содержать строку "Home page"
 */
var request = require('supertest'),
    app = require(__dirname + '/../../app')
  
describe('Pages', function () {
  describe('GET /', function () {
    it('should redirect to "home"', function (done) {
      request(app)
        .get('/')
        .expect('location', '/home')
        .expect(301, done)
    })
  })
  
  describe('fda', function () {
    it('Vczvz', function (done) {
      request(app)
        .get('/home')
        .expect(200, done)
    })
    
    it('should contain text "Home page"', function (done) {
      request(app)
        .get('/home')
        .expect(/Home page/, done)
    })
  })
})