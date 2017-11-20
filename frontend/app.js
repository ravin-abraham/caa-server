var angular = require('angular');
var bootstrap = require('bootstrap/dist/css/bootstrap.css');
angular.module('meanApp',[require('angular-route')]);

require('./controllers');
require('./services'); 

function config ($routeProvider, $locationProvider) {
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
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);


