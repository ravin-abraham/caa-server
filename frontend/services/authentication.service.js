  'use strict';

  AuthService.$inject = ['$http', '$window'];  

  function AuthService ($http, $window) {

    var _this = this;

    _this.saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
      return Promise.resolve(true);
    };

    _this.getToken = function () {
      return $window.localStorage['mean-token'];
    };

    _this.isLoggedIn = function() {
      var token = _this.getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    _this.currentUser = function() {
      if(isLoggedIn()){
        var token = _this.getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    _this.register = function(user) {
      return $http.post('/api/register', user).then(function success(res){
        return _this.saveToken(res.data.token);
      }, function error(err){/*Stub*/});
    };

    _this.login = function(user) {
      return $http.post('/api/login', user).then(function success(res) {
        _this.saveToken(res.data.token);
      }, function error(err){/*Stub*/});
    };

    _this.logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

  };

module.exports = AuthService;

