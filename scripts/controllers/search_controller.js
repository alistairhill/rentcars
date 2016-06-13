(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchSerice, apiConstant, parseResults, $filter) {

    $scope.searchInput = {};
    $scope.carResults = [];
    var dateFormat = "MM/dd/yyyy";
    var timeFormat = "HH:00";
    $scope.loaded = false;

    $scope.searchRentalCars = searchRentalCars;

    function loadDefaultSearchInput() {
      $scope.searchInput.dest = "";
      // setting current date for startdate in accepted format
      $scope.searchInput.startdate = updateTimeFormat(currentTimeOffset(), dateFormat);
      // enddate needs to be at least 24 hours ahead of current date
      $scope.searchInput.enddate = updateTimeFormat(currentTimeOffset(24), dateFormat);
      // pickuptime needs to be 3 hours ahead of current time if on current date
      $scope.searchInput.pickuptime = updateTimeFormat(currentTimeOffset(), timeFormat);
      $scope.searchInput.dropofftime = updateTimeFormat(currentTimeOffset(), timeFormat);
    }

    loadDefaultSearchInput();

    function currentTimeOffset(addHours) {
      addHours = addHours || 0;

      // adding required 3 hours time ahead by default
      var bookingHoursAhead = 3;
      var currentTime = new Date();
      return currentTime.setHours(currentTime.getHours() + bookingHoursAhead + addHours)
    }

    function updateTimeFormat(time, format) {
      return $filter('date')(time, format);
    }

    function searchRentalCars() {
      var searchInput = $scope.searchInput;
      $scope.loaded = false;
      $scope.loading = true;
      $scope.carResults = [];

      searchSerice.getCarRentals(searchInput, apiConstant).then(function successHandler(response) {
        $scope.loading = false;
        $scope.loaded = true;

        if (response.StatusCode === "0") {
          console.log(response);
          $scope.carResults = parseResults.addCarType(response);
        } else if (response.StatusCode === "100") {
          console.log(response.StatusDesc)
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
