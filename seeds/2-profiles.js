
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {user_id: 99901, url: '/profile/Aardvark', picture_url: 'http://wallpaper-gallery.net/images/image/image-1.jpg'},
        {user_id: 99902, url: '/profile/Baboon', picture_url: 'http://wallpaper-gallery.net/images/image/image-2.jpg'},
        {user_id: 99903, url: '/profile/Capybara', picture_url: 'http://wallpaper-gallery.net/images/image/image-3.jpg'},
        {user_id: 99904, url: '/profile/Duck', picture_url: 'http://wallpaper-gallery.net/images/image/image-4.jpg'},
        {user_id: 99905, url: '/profile/Elephant', picture_url: 'http://wallpaper-gallery.net/images/image/image-5.jpg'},
        {user_id: 99906, url: '/profile/Flying Fox', picture_url: 'http://wallpaper-gallery.net/images/image/image-6.jpg'},
        {user_id: 99907, url: '/profile/Gila Monster', picture_url: 'http://wallpaper-gallery.net/images/image/image-7.jpg'},
        {user_id: 99908, url: '/profile/Heron', picture_url: 'http://wallpaper-gallery.net/images/image/image-8.jpg'},
        {user_id: 99909, url: '/profile/Impala', picture_url: 'http://wallpaper-gallery.net/images/image/image-9.jpg'},
        {user_id: 99910, url: '/profile/Jerboa', picture_url: 'http://wallpaper-gallery.net/images/image/image-10.jpg'},
        {user_id: 99911, url: '/profile/Kinkajou', picture_url: 'http://wallpaper-gallery.net/images/image/image-11.jpg'},
        {user_id: 99912, url: '/profile/Lemur', picture_url: 'http://wallpaper-gallery.net/images/image/image-12.jpg'},
        {user_id: 99913, url: '/profile/Mongoose', picture_url: 'http://wallpaper-gallery.net/images/image/image-13.jpg'},
        {user_id: 99914, url: '/profile/Nyala', picture_url: 'http://wallpaper-gallery.net/images/image/image-14.jpg'},
        {user_id: 99915, url: '/profile/Ocelot', picture_url: 'http://wallpaper-gallery.net/images/image/image-15.jpg'},
        {user_id: 99916, url: '/profile/Pangolin', picture_url: 'http://wallpaper-gallery.net/images/image/image-16.jpg'},
        {user_id: 99917, url: '/profile/Quokka', picture_url: 'http://wallpaper-gallery.net/images/image/image-17.jpg'},
        {user_id: 99918, url: '/profile/Rail', picture_url: 'http://wallpaper-gallery.net/images/image/image-18.jpg'},
        {user_id: 99919, url: '/profile/Sloth', picture_url: 'http://wallpaper-gallery.net/images/image/image-19.jpg'},
        {user_id: 99920, url: '/profile/Terrapin', picture_url: 'http://wallpaper-gallery.net/images/image/image-20.jpg'},
        {user_id: 99921, url: '/profile/Urial', picture_url: 'http://wallpaper-gallery.net/images/image/image-21.jpg'},
        {user_id: 99922, url: '/profile/Viscacha', picture_url: 'http://wallpaper-gallery.net/images/image/image-22.jpg'},
        {user_id: 99923, url: '/profile/Wombat', picture_url: 'http://wallpaper-gallery.net/images/image/image-23.jpg'},
        {user_id: 99924, url: '/profile/Xerus', picture_url: 'http://wallpaper-gallery.net/images/image/image-24.jpg'},
        {user_id: 99925, url: '/profile/Yak', picture_url: 'http://wallpaper-gallery.net/images/image/image-25.jpg'},
        {user_id: 99926, url: '/profile/Zebu', picture_url: 'http://wallpaper-gallery.net/images/image/image-26.jpg'}
      ]);
    });
};
