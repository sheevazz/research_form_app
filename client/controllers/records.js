var myApp = angular.module('myApp');

myApp.controller('RecordsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
		// console.log('RecordsController loaded...');
    $scope.getRecords = function(){
        $http.get('/api/records').then(function(response){
        $scope.records = response.data;
      });
    }

    $scope.getRecordInfo = function(){
		var id = $routeParams.id;
		$http.get('/api/records/'+id).then(function(response){
			$scope.record = response.data;
			return getAllAgeRange();
		});
	}

	$scope.addRecord = function(activity_id, patient_id){
		// console.log("ADD RECORD");
		// $http.post('/api/records/', $scope.record).then(function(response){
			// window.location.href='#/patients/details/'+$scope.record.patient_id;
			// console.log('activity_id = ',activity_id);
		// });
	}

	$scope.updateRecord = function(){
		// console.log('EDIT RECORD');
		var id = $routeParams.id;
		$http.put('/api/records/'+id, $scope.record).then(function(response){
			window.history.back();
		});
	}

	$scope.removeRecord = function(id){
		const approve = confirm('Are you sure?');
		if(!approve) return;
		$http.delete('/api/records/'+id).then(function(response){
			window.history.back();
		});
	}

	let getAllAgeRange = function(){
		$http.get('/api/activities').then(function(response){
			$scope.activities = response.data;

			let lookup = {};
			let items = response.data;
			let result = [];

			for (let item, i = 0; item = items[i++];) {
			  let name = item.age_range;
				let id = item.id;
			  if (!(name in lookup)) {
			    lookup[name] = 1;
			    result.push(name);
			  }
			}

			$scope.ranges = result;
			$scope.age_range = result[0];

		});
	}

}]);
