(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchSerice) {

    $scope.searchInput = {};
    $scope.searchInput.dest = "LAX";
    $scope.searchInput.startdate = "06/11/2016";
    $scope.searchInput.enddate = "06/12/2016";
    $scope.searchInput.pickuptime = "12:00";
    $scope.searchInput.dropofftime = "12:00";

    activate();

    function activate() {
      var searchInput = $scope.searchInput;

      searchSerice.getCarRentals(searchInput).then(function successHandler(response) {
        console.log(response)

      }, epicFail);
    }

    function epicFail(response) {
      console.error(response);
    }

  });
})();
