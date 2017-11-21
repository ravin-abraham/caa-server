'use strict';

LoginCtrl.$inject = ['$location', 'authentication', '$auth'];

function LoginCtrl($location, authentication, $auth) {
    var vm = this;

    vm.credentials = { email : "", password : "" };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)        
        .then(function(){
          $location.path('home');
        });
    };

    vm.authenticate = function(provider) {
      console.log("logging with ",provider);
      $auth.authenticate('google')
      .then(function(response) {
        console.log(response);
        return $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+response.access_token).then(function success(res){
          console.log(res);        
      }, function error(err){/*Stub*/});
      })
      .catch(function(response) {
      // Something went wrong.
      });
    };
}

module.exports = LoginCtrl;