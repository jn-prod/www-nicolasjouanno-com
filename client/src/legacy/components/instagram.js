var config = {
  access_token: '19694663.af157dd.d04fe998f4464076aee9e5dd3ec7dddf',
  num_photos: 5,
  profil_url: 'https://www.instagram.com/nicolasjouanno/',
};

var instagram = () => {
  // FLUX INSTAGRAM
  $.ajax({
    url: 'https://api.instagram.com/v1/users/self/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: config.access_token, count: config.num_photos },
    success: data => {
      data.data.forEach(val => {
        $('#instafeed').append(
          '<div class="col-lg-2 col-sm-4 mb-2 mx-auto text-center"><a href="' +
            config.profil_url +
            '" target="_blank" rel="nofollow"><img alt="instagram nicolasjouanno" class="img-fluid" src="' +
            val.images.low_resolution.url +
            '"></a></div>',
        );
      });
    },
    error: data => {
      console.log(data);
    },
  });
};

export default instagram();
