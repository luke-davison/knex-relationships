var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(users => {
      let viewData = { users: users }
      res.render('index', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/profile/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(profiles => {
      if (profiles[0]) {
        let viewData = buildViewData(profiles[0], req.query.password)
        res.render('profile', viewData)
      } else {
        res.redirect('/')
      }
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/login/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      res.redirect('/profile/' + req.params.url + '?password=' + req.body.password)
    })
})

router.get('/adduser/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      let viewData = buildViewData(profiles[0], req.query.password)
      viewData.randomkitty = 'http://placekitten.com/400/4' + Math.floor(Math.random() * 50 + 20)
      res.render('add', viewData)
    })
})

router.post('/adduser/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      if (req.query.password === profiles[0].password && profiles[0].user_type === 'admin') {
        db.addUser(req.body, req.app.get('connection'))
          .then(function () {
            res.redirect('/')
          })
      } else {
        res.redirect('/adduser' + req.params.url + '?password=' + req.query.password)
      }
    })
})

router.get('/delete/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      let viewData = buildViewData(profiles[0], req.query.password)
      res.render('delete', viewData)
    })
})

router.post('/delete/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      if (req.query.password === profiles[0].password) {
        db.deleteUser(profiles[0].id, req.app.get('connection'))
          .then(function () {
            res.redirect('/')
          })
      } else {
        res.redirect('/delete/' + req.params.url + '?password=' + req.query.password)
      }
    })
})

router.get('/newblogpost/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      let viewData = buildViewData(profiles[0], req.query.password)
      res.render('blogpost', viewData)
    })
})

router.post('/newblogpost/:url', function (req, res) {
  db.getProfile(req.params.url, req.app.get('connection'))
    .then(function (profiles) {
      db.addBlogPost(profiles[0].id, req.body.title, req.body.content, req.app.get('connection'))
        .then(function () {
          res.redirect('/')
        })
    })
})

router.get('/allposts', function (req, res) {
  db.getAllPosts(req.app.get('connection'))
    .then(function (posts) {
      let viewData = { posts: posts }
      res.render('allposts', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/post/:id', function (req, res) {
  db.getOnePost(req.params.id, req.app.get('connection'))
    .then(function (posts) {
      let viewData = posts[0]
      res.render('post', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

function buildViewData (viewData, password) {
  if (viewData) {
    viewData.login = password === viewData.password
    viewData.wrongPassword = password !== viewData.password && password !== undefined
    viewData.admin = viewData.user_type === 'admin'
    viewData.password = password
    return viewData
  } else {
    return {login: false}
  }
}

module.exports = router
