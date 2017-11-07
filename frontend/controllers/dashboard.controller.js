'use strict';


function DashboardController($scope, $http, $timeout) {
	
	var loadTime = 1000, errorCount = 0, loadPromise;

	var getData = function() {  
    $http.get('/api/pairsession/latest')

    .then(function(res) {
    	var current_ts = Date.now();
    	$scope.lastRefreshed = "Last refreshed at " + current_ts;
      	$scope.data = res.data;

      	var current_val_obj_from_server = res.data[0].pair_match_value[res.data[0].pair_match_value.length - 1];
      	var pair_val_from_current_val_obj = Object.values(current_val_obj_from_server);      	
      	$scope.latestMatchValue = pair_val_from_current_val_obj[0];
      	//For testing.
      	//$scope.latestMatchValue = Math.floor((Math.random() * 100) + 1);
      	errorCount = 0;
      	nextLoad();
    })

    .catch(function(res) {  
    	console.log(res);  	
      	$scope.data = 'Server error';
      	nextLoad(++errorCount * 2 * loadTime);
    	});
  	};

	var cancelNextLoad = function() {
    	$timeout.cancel(loadPromise);
  	};

	var nextLoad = function(mill) {
    	mill = mill || loadTime;

    	//Always make sure the last timeout is cleared before starting a new one
    	cancelNextLoad();
    	loadPromise = $timeout(getData, mill);
  	};

    //Start polling the data from the server
	getData();

    //Always clear the timeout when the view is destroyed, otherwise it will keep polling and leak memory
    $scope.$on('$destroy', function() {
    cancelNextLoad();
  });

}

module.exports = DashboardController;




