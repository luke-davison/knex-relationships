
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getProfile: getProfile,
  getLogin: getLogin
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
  return connection('profiles')
    .join('users', 'profiles.user_id', 'users.id')
    .where('url', '/profile/' + profileUrl)
}

function getLogin (profileUrl, connection) {
  return connection('users')
    .join('profiles', 'users.id', 'profiles.user_id')
    .join('logins', 'users.id', 'logins.user_id')
    .where('url', '/profile/' + profileUrl)
    .select('logins.password')
}
