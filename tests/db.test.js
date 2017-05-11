// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var db = require('../db')

test('getUsers gets all users', function (t) {
  // One for each letter of the alphabet!
  var expected = 26
  return db.getUsers(t.context.connection)
    .then(function (result) {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getUsers gets a single user', function (t) {
  var expected = 'Ambitious Aardvark'
  return db.getUser(99901, t.context.connection)
    .then(function (result) {
      var actual = result[0].name
      t.is(actual, expected)
    })
})

test('getProfile returns information of a single user', t => {
  var expected = 1
  return db.getProfile('Kinkajou', t.context.connection)
    .then(result => {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getProfile returns user information of a user', t => {
  var expected = 99911
  return db.getProfile('Kinkajou', t.context.connection)
    .then(result => {
      var actual = result[0].id
      t.is(actual, expected)
    })
})

test('getProfile returns login information of a user', t => {
  var expected = 'password'
  return db.getProfile('Kinkajou', t.context.connection)
    .then(result => {
      var actual = result[0].password
      t.is(actual, expected)
    })
})

test('addUser adds a new user', t => {
  var expected = 27
  var newUser = {
    name: 'name3',
    email: 'email@email3',
    userType: 'type3',
    url: 'url3',
    pictureUrl: 'picurl3',
    password: 'password3'
  }
  return db.addUser(newUser, t.context.connection)
    .then(() => {
      return db.getUsers(t.context.connection)
        .then(result => {
          var actual = result.length
          t.is(actual, expected)
        })
    })
})

test('addUser adds the email info to the user database', t => {
  var expected = 'email@email4'
  var newUser = {
    name: 'name3',
    email: 'email@email4',
    userType: 'type3',
    url: 'url4',
    pictureUrl: 'picurl3',
    password: 'password3'
  }
  return db.addUser(newUser, t.context.connection)
    .then(() => {
      return db.getUsers(t.context.connection)
        .then(result => {
          var actual = result[result.length - 1].email
          t.is(actual, expected)
        })
    })
})

test('addUser adds the pic url to the profile database', t => {
  var expected = 'picurl5'
  var newUser = {
    name: 'name3',
    email: 'email@email4',
    userType: 'type3',
    url: 'url5',
    pictureUrl: 'picurl5',
    password: 'password5'
  }
  return db.addUser(newUser, t.context.connection)
    .then(() => {
      return db.getProfile('url5', t.context.connection)
        .then(result => {
          var actual = result[0].picture_url
          t.is(actual, expected)
        })
    })
})
