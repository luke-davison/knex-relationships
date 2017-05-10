
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getProfile: getProfile,
  addUser: addUser,
  deleteUser: deleteUser,
  addBlogPost: addBlogPost,
  getAllPosts: getAllPosts,
  getOnePost: getOnePost
}

function getUsers (connection) {
  return connection('users')
    .join('profiles', 'users.id', 'profiles.user_id')
    .select()
}

function getUser (id, connection) {
  return connection('users')
    .where('id', id)
}

function getOnePost (id, connection) {
  return connection('posts')
  .join('users', 'posts.user_id', 'users.id')
  .where('posts.id', id)
}

function getProfile (url, connection) {
  return connection('users')
    .join('profiles', 'users.id', 'profiles.user_id')
    .join('logins', 'users.id', 'logins.user_id')
    .where('url', url)
    .select('users.id', 'users.name', 'users.email', 'users.user_type', 'profiles.url', 'profiles.picture_url', 'logins.password')
}

function addUser (newUser, connection) {
  return addUserInfo(newUser.name, newUser.email, newUser.userType, connection)
    .then(userId => {
      userId = userId[0]
      addProfileInfo(userId, newUser.url, newUser.pictureUrl, connection)
        .then(() => {
          addLoginInfo(userId, newUser.password, connection)
            .then()
        })
    })
}

function addUserInfo (name, email, userType, connection) {
  return connection('users')
    .insert({name: name, email: email, user_type: userType})
}

function addProfileInfo (userId, url, pictureUrl, connection) {
  return connection('profiles')
    .insert({user_id: userId, url: url, picture_url: pictureUrl})
}

function addLoginInfo (userId, password, connection) {
  return connection('logins')
    .insert({user_id: userId, password: password})
}

function deleteUser (userId, connection) {
  return deleteLoginInfo(userId, connection)
    .then(() => {
      deleteProfileInfo(userId, connection)
        .then(() => {
          deleteUserInfo(userId, connection)
            .then()
        })
    })
}

function deleteLoginInfo (userId, connection) {
  return connection('logins')
    .where('user_id', userId)
    .del()
}

function deleteProfileInfo (userId, connection) {
  return connection('profiles')
    .where('user_id', userId)
    .del()
}

function deleteUserInfo (userId, connection) {
  return connection('users')
    .where('id', userId)
    .del()
}

function addBlogPost (userId, title, content, connection) {
  return connection('posts')
    .insert({user_id: userId, title: title, content: content})
}

function getAllPosts (connection) {
  return connection('posts')
    .select()
}
