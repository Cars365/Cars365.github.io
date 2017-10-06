'use strict';

angular.module('cars365.home', ['ngRoute', 'oi.select'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'app/components/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['DataService','$scope','$http', function(DataService, $scope, $http) {
	$scope.data = DataService;
	$scope.car = {};

  $scope.kms = [
    '10,000 KM',
    '10,000 - 20,000 KM',
    '20,000 - 40,000 KM',
    '40,000 - 60,000 KM',
    '60,000 - 80,000 KM',
    '80,000 - 1,00,000 KM',
    'Above 1,00,000 KM',
  ];


	$scope.changeBrand = function(){
		$scope.models = $scope.data.find(function(x){return x.text === $scope.car.brand.text; }).models;
		$scope.car.model = $scope.car.year = $scope.car.variant = null;

	}

	$scope.changeModel = function(){
		$scope.years = $scope.models.find(function(x){return x.text === $scope.car.model.text; }).years;
    console.log($scope.years);
    // Special case: Add year 2017, and add all the cars of 2016
    var data2016 = $scope.years.find(function(i){return i.text == '2016'});
    var data2017 = null;
    if(data2016){
      data2017 = angular.copy(data2016);
      data2017.text = "2017";
      $scope.years.unshift(data2017);
    }
    

		$scope.car.year = $scope.car.variant = null;
	}

	$scope.changeYear = function(){
		$scope.variants = $scope.years.find(function(x){return x.text === $scope.car.year.text; }).variants;
		$scope.car.variant = null;
	}

	$scope.submit = function() {
		var car = {};
		if($scope.car.brand) car.brand = $scope.car.brand.text;
		if($scope.car.model) car.model = $scope.car.model.text;
		if($scope.car.year) car.year = $scope.car.year.text;
		if($scope.car.variant) car.variant = $scope.car.variant.text;
    if($scope.car.km) car.km = $scope.car.km;

    $scope.disableSubmit = true;

    var url = 'http://api.cars365.in/notify.php?name='+$scope.name+'&phone='+$scope.phone+'&brand='+car.brand+'&model='+car.model+'&year='+car.year+'&variant='+car.variant+'&km='+car.km;
    console.log(url);
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        // alert(response['success']+ typeof(response.success));
        if(!$scope.leadCaptured){
          $scope.leadCaptured = true;
        }else{
          console.log(response);
          if(response.data.success == 1){
            $scope.showSuccess = true;
          }
          else if(response.data.success == '0'){
            $scope.showEmailFail = true;
          }
        }

        $scope.disableSubmit = false;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error(error);
        $scope.disableSubmit = false;
      });

	}
}]);
