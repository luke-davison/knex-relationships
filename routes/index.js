var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function (users) {
      let viewData = { users: users }
      res.render('index', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      console.log(req.query.password)
      let viewData = profiles[0]
      viewData.login = req.query.password === profiles[0].password
      viewData.wrongPassword = req.query.password !== profiles[0].password && req.query.password !== undefined
      viewData.admin = profiles[0].user_type === 'admin'
      res.render('profile', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/login/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      res.redirect('/profile/' + req.params.profileurl + '?password=' + req.body.password)
    })
})

module.exports = router
