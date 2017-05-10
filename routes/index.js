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
      viewData.login = req.query.password === profiles[0].password
      viewData.wrongPassword = req.query.password !== profiles[0].password && req.query.password !== undefined
      viewData.admin = profiles[0].user_type === 'admin'
      viewData.password = req.query.password
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

router.get('/adduser/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      let viewData = profiles[0]
      viewData.randomkitty = 'http://placekitten.com/400/4' + Math.floor(Math.random() * 50)
      viewData.login = req.query.password === profiles[0].password
      viewData.wrongPassword = req.query.password !== profiles[0].password && req.query.password !== undefined
      viewData.admin = profiles[0].user_type === 'admin'
      viewData.password = req.query.password
      res.render('add', viewData)
    })
})

router.post('/adduser/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      if (req.query.password === profiles[0].password && profiles[0].user_type === 'admin') {
        db.addUser(req.body.name, req.body.email, req.body.user_type, req.body.url, req.body.picture_url, req.body.password, req.app.get('connection'))
          .then(function () {
            res.redirect('/')
          })
      } else {
        res.redirect('/adduser' + req.params.profileurl + '?password=' + req.query.password)
      }
    })
})

router.get('/delete/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      let viewData = profiles[0]
      viewData.login = req.query.password === profiles[0].password
      viewData.wrongPassword = req.query.password !== profiles[0].password && req.query.password !== undefined
      viewData.password = req.query.password
      res.render('delete', viewData)
    })
})

router.post('/delete/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      if (req.query.password === profiles[0].password) {
        db.deleteUser(profiles[0].id, req.app.get('connection'))
          .then(function () {
            res.redirect('/')
          })
      } else {
        res.redirect('/delete/' + req.params.profileurl + '?password=' + req.query.password)
      }
    })
})


router.get('/newblogpost/profile/:profileurl', function (req, res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
      let viewData = profiles[0]
      viewData.login = req.query.password === profiles[0].password
      viewData.wrongPassword = req.query.password !== profiles[0].password && req.query.password !== undefined
      viewData.password = req.query.password
      res.render('blogpost', viewData)
    })
})


router.post('/newblogpost/profile/:profileurl', function (req,res) {
  db.getProfile(req.params.profileurl, req.app.get('connection'))
    .then(function (profiles) {
    let selectedUser = profiles[0].id
    db.addBlogPost(selectedUser, req.body.title, req.body.content, req.app.get('connection'))
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
  db.getOnePost(req.params.id,req.app.get('connection'))
    .then(function (posts) {
      let viewData = posts[0]
      res.render('post', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})



module.exports = router
