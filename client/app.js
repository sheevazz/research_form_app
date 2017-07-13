var myApp = angular.module('myApp',['ngRoute', '720kb.datepicker']);

myApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

myApp.config(function($routeProvider){
  $routeProvider.when('/',{
    controller:'PatientsController',
    templateUrl:'views/patients.html'
  })
  .when('/patients',{
    controller:'PatientsController',
    templateUrl:'views/patients.html'
  })
  .when('/patients/details/:id',{
    controller:'PatientsController',
    templateUrl:'views/patient_details.html'
  })
  .when('/patients/add',{
    controller:'PatientsController',
    templateUrl:'views/add_patient.html'
  })
  .when('/patients/edit/:id',{
    controller:'PatientsController',
    templateUrl:'views/edit_patient.html'
  })
  .when('/records',{
    controller:'RecordsController',
    templateUrl:'views/records.html'
  })
  .when('/records/details/:id',{
    controller:'RecordsController',
    templateUrl:'views/record_details.html'
  })
  .when('/records/add',{
    controller:'RecordsController',
    templateUrl:'views/add_record.html'
  })
  .when('/records/edit/:id',{
    controller:'RecordsController',
    templateUrl:'views/edit_record.html'
  })
  .otherwise({
    redirectTo:'/'
  });
});
