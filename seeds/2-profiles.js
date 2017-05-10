
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {user_id: 99901, url: 'Aardvark', picture_url: 'http://placekitten.com/400/401'},
        {user_id: 99902, url: 'Baboon', picture_url: 'http://placekitten.com/400/402'},
        {user_id: 99903, url: 'Capybara', picture_url: 'http://placekitten.com/400/403'},
        {user_id: 99904, url: 'Duck', picture_url: 'http://placekitten.com/400/404'},
        {user_id: 99905, url: 'Elephant', picture_url: 'http://placekitten.com/400/405'},
        {user_id: 99906, url: 'FlyingFox', picture_url: 'http://placekitten.com/400/406'},
        {user_id: 99907, url: 'GilaMonster', picture_url: 'http://placekitten.com/400/407'},
        {user_id: 99908, url: 'Heron', picture_url: 'http://placekitten.com/400/408'},
        {user_id: 99909, url: 'Impala', picture_url: 'http://placekitten.com/400/409'},
        {user_id: 99910, url: 'Jerboa', picture_url: 'http://placekitten.com/400/410'},
        {user_id: 99911, url: 'Kinkajou', picture_url: 'http://placekitten.com/400/411'},
        {user_id: 99912, url: 'Lemur', picture_url: 'http://placekitten.com/400/412'},
        {user_id: 99913, url: 'Mongoose', picture_url: 'http://placekitten.com/400/413'},
        {user_id: 99914, url: 'Nyala', picture_url: 'http://placekitten.com/400/414'},
        {user_id: 99915, url: 'Ocelot', picture_url: 'http://placekitten.com/400/415'},
        {user_id: 99916, url: 'Pangolin', picture_url: 'http://placekitten.com/400/416'},
        {user_id: 99917, url: 'Quokka', picture_url: 'http://placekitten.com/400/417'},
        {user_id: 99918, url: 'Rail', picture_url: 'http://placekitten.com/400/418'},
        {user_id: 99919, url: 'Sloth', picture_url: 'http://placekitten.com/400/419'},
        {user_id: 99920, url: 'Terrapin', picture_url: 'http://placekitten.com/400/420'},
        {user_id: 99921, url: 'Urial', picture_url: 'http://placekitten.com/400/421'},
        {user_id: 99922, url: 'Viscacha', picture_url: 'http://placekitten.com/400/422'},
        {user_id: 99923, url: 'Wombat', picture_url: 'http://placekitten.com/400/423'},
        {user_id: 99924, url: 'Xerus', picture_url: 'http://placekitten.com/400/424'},
        {user_id: 99925, url: 'Yak', picture_url: 'http://placekitten.com/400/425'},
        {user_id: 99926, url: 'Zebu', picture_url: 'http://placekitten.com/400/426'}
      ]);
    });
};
