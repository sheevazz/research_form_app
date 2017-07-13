var myApp = angular.module('myApp');

myApp.controller('PatientsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	// console.log('PatientsController loaded...');
    $scope.getPatients = function(){
        $http.get('/api/patients').then(function(response){
        $scope.patients = response.data;
      	// console.log("GET ALL",response.data)
	});
    }

    $scope.getPatientInfo = function(){
		var id = $routeParams.id;
		$http.get('/api/patients/'+id).then(function(response){
			$scope.patient = response.data;
			return $http.get('/api/records?patient_id='+id);
		}).then(function(response){
			$scope.patient_activities = response.data;
			return getAllAgeRange();

		});
	}

	$scope.addPatient = function(){
		$http.post('/api/patients/', $scope.patient).then(function(response){
			$location.url('/patients');
		});
	}

	$scope.updatePatient = function(){
		var id = $routeParams.id;
		$http.put('/api/patients/'+id, $scope.patient).then(function(response){
			window.location.href='#/patients/details/'+id;
		});
	}

	$scope.removePatient = function(id){
		const approve = confirm('Are you sure?');
		if(!approve) return;
		$http.delete('/api/patients/'+id).then(function(response){
			window.location.href='#/patients';
		});
	}

	$scope.age_range = 1;
	$scope.visited_date = '';
	$scope.activity_id = '';

	$scope.addRecord = function(activity_id, patient_id, visited_date){
		const body = {
			patient_id: patient_id,
			activity_id: activity_id,
			visited_date: visited_date
		}
		$http.post('/api/records/', body).then(function(response){
			// window.location.href='#/patients/details/'+$scope.record.patient_id;
			window.location.reload();
		});
	}

	let getAllAgeRange = function(){
		$http.get('/api/activities').then(function(response){
			$scope.activities = response.data;

			let lookup = {};
			let items = response.data;
			let result = [];
			let p_act = {};

			for (let item, i = 0; item = items[i++];) {
			  let name = item.age_range;
				let id = item.id;
			  if (!(name in lookup)) {
			    lookup[name] = 1;
			    result.push(name);
			  }
				p_act[item.id] = { record_id: [], count: 0, dates: [] };
			}

			for (let i in $scope.patient_activities) {
				p_act[$scope.patient_activities[i].activity_id].count++;
				p_act[$scope.patient_activities[i].activity_id].dates.push($scope.patient_activities[i].visited_date)
				p_act[$scope.patient_activities[i].activity_id].record_id.push($scope.patient_activities[i].id)
			}

			$scope.ranges = result;
			$scope.age_range = result[0];
			$scope.p_act = p_act;
			// console.log(p_act);
			//dates var dataArray = [];
			//record_id var valueArray = [];



		});
	}

	$scope.toggleCollapse = function(event) {
		event.target.nextElementSibling.classList.remove('collapse');
		event.target.nextElementSibling.classList.toggle('collapsing');
		event.target.nextElementSibling.classList.toggle('collapsing');
		event.target.nextElementSibling.classList.add('collapse');
		event.target.nextElementSibling.classList.toggle('in');
	}



	// $scope.getAllAgeRange();


}]);
