
exports.up = function(knex, Promise) {
  return knex.schema.createTable('logins', function (table) {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.string('password')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('logins')
};
