'use strict';

var angular = require('angular');

angular.module('meanApp').controller('dashboardCtrl', require('./dashboard.controller'));
angular.module('meanApp').controller('loginCtrl', require('./login.controller'));
angular.module('meanApp').controller('registerCtrl', require('./register.controller'));