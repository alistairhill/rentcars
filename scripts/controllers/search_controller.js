(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchSerice, apiConstant, parseResults, $filter) {

    var nativeDatePickerFormat = "yyyy-MM-dd";

    $scope.searchInput = {};
    $scope.hoursList = makeHours();
    $scope.carResults = [];
    $scope.minStartDate = updateTimeFormat(currentTime(), nativeDatePickerFormat);
    $scope.searchRentalCars = searchRentalCars;

    function loadDefaultSearchInput() {
      $scope.searchInput.dest = "";
      // setting current date for startdate in accepted format
      $scope.searchInput.startdate = currentTime();

      // enddate needs to be at least 24 hours ahead of current date
      $scope.searchInput.enddate = currentTime(24);
      // setting default times to 12pm
      $scope.searchInput.pickuptime = $scope.hoursList[12];
      $scope.searchInput.dropofftime = $scope.hoursList[12];
    }

    loadDefaultSearchInput();

    function makeHours() {
      var amPmTimeFormat = "h:00 a";
      var currentTime = new Date();
      var timeObjects = [];
      currentTime.setHours(0,0,0,0);
      for (var i = 0; i < 24; i++) {
        var timeObj = {
          time: currentTime.setHours(i,0,0,0),
          label: updateTimeFormat(currentTime.setHours(i,0,0,0), amPmTimeFormat)
        }
        timeObjects.push(timeObj);
      }
      return timeObjects;
    }

    function currentTime(addHours) {
      addHours = addHours || 0;
      var currentTime = new Date();

      // adding required 3 hours time ahead by default
      var bookingHoursAhead = 3;
      currentTime.setHours(currentTime.getHours() + bookingHoursAhead + addHours);
      return currentTime;
    }

    function updateTimeFormat(time, format) {
      return $filter('date')(time, format);
    }

    function updateInputForApi(searchInput) {
      var hotwireDateFormat = "MM/dd/yyyy";
      var hotwireTimeFormat = "HH:00";

      searchInput.startdate = updateTimeFormat(searchInput.startdate, hotwireDateFormat);
      searchInput.enddate = updateTimeFormat(searchInput.enddate, hotwireDateFormat);
      searchInput.pickuptime = updateTimeFormat(searchInput.pickuptime.time, hotwireTimeFormat);
      searchInput.dropofftime = updateTimeFormat(searchInput.dropofftime.time, hotwireTimeFormat);
      return searchInput;
    }

    function searchRentalCars() {
      // keeping $scope.searchInput in native date picker format
      var searchInputCopy = angular.copy($scope.searchInput);
      var hotwireFormattedInput = updateInputForApi(searchInputCopy);

      $scope.loading = true;
      $scope.carResults = [];

      searchSerice.getCarRentals(hotwireFormattedInput, apiConstant).then(function successHandler(response) {
        $scope.loading = false;

        if (response.StatusCode === "0") {
          console.log(response);
          $scope.carResults = parseResults.addCarType(response);
        } else if (response.StatusCode === "100") {
          console.log(response.StatusDesc)
        } else {
            console.log(response)
        }

      }, epicFail);
    }

    function epicFail(response) {
      console.error(response);
    }

  });
})();
