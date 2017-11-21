var angular = require('angular');
var bootstrap = require('bootstrap/dist/css/bootstrap.css');
angular.module('meanApp',[require('angular-route'), require('satellizer')]);

require('./controllers');
require('./services'); 

function config ($routeProvider, $locationProvider, $authProvider) {
    $routeProvider
      .when('/', {
        template: require('./login.html'),
        controller: 'loginCtrl',
        controllerAs: 'vm'

      })
      .when('/register', {
        template: require('./register.html'),
        controller: 'registerCtrl',
        controllerAs: 'vm'

      })
      .when('/login', {
        template: require('./login.html'),
		controller: 'loginCtrl',
        controllerAs: 'vm'        
      })
      .when('/home', {
        template: require('./home.html'),
        controller: 'dashboardCtrl',
        controllerAs: 'vm'        
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  
  
  $authProvider.google({
  url: '/auth/google',
  clientId: '134937980315-ev8q4v5t1im2uvetsjpa5486ims4a572.apps.googleusercontent.com',
  responseType: 'token',
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  redirectUri: window.location.origin,
  requiredUrlParams: ['scope'],
  optionalUrlParams: ['display'],
  scope: ['profile', 'email'],
  scopePrefix: 'openid',
  scopeDelimiter: ' ',
  display: 'popup',
  oauthType: '2.0',
  popupOptions: { width: 452, height: 633 }
});
  }


function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/home' && !authentication.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }
  
 angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', '$authProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);


