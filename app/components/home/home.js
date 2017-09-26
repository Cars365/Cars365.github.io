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



	$scope.changeBrand = function(){
		$scope.models = $scope.data.find(function(x){return x.text === $scope.car.brand.text; }).models;
		$scope.car.model = $scope.car.year = $scope.car.variant = null;

	}

	$scope.changeModel = function(){
		$scope.years = $scope.models.find(function(x){return x.text === $scope.car.model.text; }).years;
		$scope.car.year = $scope.car.variant = null;
	}

	$scope.changeYear = function(){
		$scope.variants = $scope.years.find(function(x){return x.text === $scope.car.year.text; }).variants;
		$scope.car.variant = null;
	}

	$scope.submit = function() {
		var car = {};
		car.brand = $scope.car.brand.text;
		car.model = $scope.car.model.text;
		car.year = $scope.car.year.text;
		car.variant = $scope.car.variant.text;

    $http({
      method: 'GET',
      url: 'backend/notify.php?phone='+$scope.phone+'&brand='+car.brand+'&model='+car.model+'&year='+car.year+'&variant='+car.variant
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        // alert(response['success']+ typeof(response.success));
        console.log(response);
        if(response.data.success == 1){
          $scope.showSuccess = true;
        }
        else if(response.data.success == '0'){
          $scope.showEmailFail = true;
        }

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response);
      });

	}
}]);
