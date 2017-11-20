'use strict';

LoginCtrl.$inject = ['$location', 'authentication'];

function LoginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = { email : "", password : "" };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)        
        .then(function(){
          $location.path('home');
        });
    };

}

module.exports = LoginCtrl;