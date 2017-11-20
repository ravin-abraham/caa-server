  'use strict';

  RegisterCtrl.$inject = ['$location', 'authentication'];

  function RegisterCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)        
        .then(function(){
          $location.path('home');
        });
    };

  }

module.exports = RegisterCtrl;