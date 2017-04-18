$(document).ready(function() {

  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });

  $('.btn-login').click(function(e) {
    e.preventDefault();
    lock.show();
  });

  $('.btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  })

  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }
      console.log('authResult.idToken', authResult.idToken);
      localStorage.setItem('id_token', authResult.idToken);
      // Display user information
      show_profile_info(profile);
      showPlaylists();
    });
  });

  var showPlaylists = function() {
    var idToken = localStorage.getItem('id_token');

    var request = $.ajax({
      url: 'http://localhost:3000/api/playlists',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + idToken
      }
    });

    request.done(function(results){
      console.log(results);

      for (var i=0, x=results.length; i<x; i++){
        $('.main').append('<h3>' + results[i].title + '</h3>')
      }
    });
  };

  //retrieve the profile:
  var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        // Display user information
        show_profile_info(profile);
      });
    }
  };

  var show_profile_info = function(profile) {
     $('.nickname').text(profile.nickname);
     $('.btn-login').hide();
     $('.avatar').attr('src', profile.picture).show();
     $('.btn-logout').show();
  };

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };

  retrieve_profile();
});
