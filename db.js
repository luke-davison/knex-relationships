
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  getProfile: getProfile,
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
