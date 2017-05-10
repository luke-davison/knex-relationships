
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('logins').del()
    .then(function () {
      // Inserts seed entries
      return knex('logins').insert([
        {user_id: 99901, password: 'password'},
        {user_id: 99902, password: 'password'},
        {user_id: 99903, password: 'password'},
        {user_id: 99904, password: 'password'},
        {user_id: 99905, password: 'password'},
        {user_id: 99906, password: 'password'},
        {user_id: 99907, password: 'password'},
        {user_id: 99908, password: 'password'},
        {user_id: 99909, password: 'password'},
        {user_id: 99910, password: 'password'},
        {user_id: 99911, password: 'password'},
        {user_id: 99912, password: 'password'},
        {user_id: 99913, password: 'password'},
        {user_id: 99914, password: 'password'},
        {user_id: 99915, password: 'password'},
        {user_id: 99916, password: 'password'},
        {user_id: 99917, password: 'password'},
        {user_id: 99918, password: 'password'},
        {user_id: 99919, password: 'password'},
        {user_id: 99920, password: 'password'},
        {user_id: 99921, password: 'password'},
        {user_id: 99922, password: 'password'},
        {user_id: 99923, password: 'password'},
        {user_id: 99924, password: 'password'},
        {user_id: 99925, password: 'password'},
        {user_id: 99926, password: 'password'}
      ]);
    });
};
