
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getProfile: getProfile,
  addUser: addUser,
}

function getUsers (connection) {
  return connection('users')
    .join('profiles','users.id','profiles.user_id')
    .select()

}

function getUser (id, connection) {
  return connection('users').where('id', id)
}

function getProfile (profileUrl, connection) {
  return connection('users')
    .join('profiles', 'users.id', 'profiles.user_id')
    .join('logins', 'users.id', 'logins.user_id')
    .where('url', '/profile/' + profileUrl)
    .select('users.id', 'users.name', 'users.email', 'users.user_type', 'profiles.url', 'profiles.picture_url', 'logins.password')
}

function addUser (name, email, userType, url, pictureUrl, password, connection) {
  return addUserInfo(name, email, userType, connection)
    .then(userId => {
      userId = userId[0]
      addProfileInfo(userId, '/profile/' + url, pictureUrl, connection)
        .then(() => {
          addLoginInfo(userId, password, connection)
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
