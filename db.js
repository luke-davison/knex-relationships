
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getProfile: getProfile
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
