(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchSerice, apiConstant, parseResults, $filter) {

    $scope.searchInput = {};
    $scope.carResults = [];
    var dateFormat = "MM/dd/yyyy";
    var timeFormat = "HH:00";

    $scope.searchRentalCars = searchRentalCars;

    function loadDefaultSearchInput() {
      $scope.searchInput.dest = "";
      // setting current date in for startdate in accepted format
      $scope.searchInput.startdate = updateTimeFormat(getDate(), dateFormat);
      // enddate needs to be at least 24 hours ahead of current date
      $scope.searchInput.enddate = updateTimeFormat(getDate(24), dateFormat);
      // pickuptime needs to be 3 hours ahead of current time if on current date
      $scope.searchInput.pickuptime = updateTimeFormat(getDate(3), timeFormat);
      $scope.searchInput.dropofftime = "12:00";
    }

    loadDefaultSearchInput();

    function getDate(addHours) {
      addHours = addHours || 0;
      var currentTime = new Date();
      return currentTime.setHours(currentTime.getHours() + addHours)
    }

    function updateTimeFormat(time, format) {
      return $filter('date')(time, format);
    }

    function searchRentalCars() {
      var searchInput = $scope.searchInput;
      $scope.carResults = [];

      searchSerice.getCarRentals(searchInput, apiConstant).then(function successHandler(response) {
        if (response.StatusDesc === "success") {
          console.log(response);
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
