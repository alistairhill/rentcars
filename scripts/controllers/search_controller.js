(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchSerice, apiConstant, parseResults) {

    $scope.searchInput = {};
    $scope.carResults = [];

    $scope.searchRentalCars = searchRentalCars;

    function searchInputDefaults() {
      $scope.searchInput.dest = "";
      $scope.searchInput.startdate = "06/11/2016";
      $scope.searchInput.enddate = "06/12/2016";
      $scope.searchInput.pickuptime = "16:00";
      $scope.searchInput.dropofftime = "12:00";
    }

    activate();

    function activate() {
      searchInputDefaults();
    }

    function searchRentalCars() {
      var searchInput = $scope.searchInput;
      searchSerice.getCarRentals(searchInput, apiConstant).then(function successHandler(response) {
        if (response.StatusDesc === "success") {
          $scope.carResults = parseResults.addCarType(response);
        } else {
          console.log(response.Errors)
        }

      }, epicFail);
    }

    function epicFail(response) {
      console.error(response);
    }

  });
})();
