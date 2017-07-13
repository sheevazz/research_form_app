var myApp = angular.module('myApp');

myApp.controller('ActivitiesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	// console.log('PatientsController loaded...');
    $scope.getActivities = function(){
        $http.get('/api/activities').then(function(response){
        $scope.patients = response.data;
      });
    }

}]);
