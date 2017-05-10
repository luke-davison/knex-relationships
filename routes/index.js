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
      let viewData = profiles[0]
      viewData.login = req.query.login === 'true'
      viewData.wrongPassword = req.query.login === 'wrong'
      res.render('profile', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/profile/:profileurl', function (req, res) {
  console.log('hi')
  db.getLogin(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {

      if (req.body.password === profiles[0].password) {
        res.redirect('/profile/' + req.params.profileurl + '?login=true')
      } else {
        res.redirect('/profile/' + req.params.profileurl + '?login=wrong')
      }
    })
})

module.exports = router
