'use strict';

function DashboardController($scope) {
   // Initialize variables
   $scope.name1 = '';
   this.name2 = '';
   $scope.greeting1 = `Hello ${$scope.name1}`;
   this.greeting2 = `Hi ${this.name2}`;

   $scope.value = 65;
   $scope.options = {
    size: 300
   };
}

module.exports = DashboardController;