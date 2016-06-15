(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchService, apiConstant,
    parseResults, $filter, time) {

    var nativeDatePickerFormat = "yyyy-MM-dd";
    $scope.searchInput = {};
    $scope.hoursList = time.makeHoursList();
    $scope.minStartDate = time.updateFormat(time.getCurrent(), nativeDatePickerFormat);
    $scope.displayResults = false;
    $scope.searchRentalCars = searchRentalCars;

    function loadDefaultSearchInput() {
      $scope.searchInput.dest = "";
      // setting current date for startdate in accepted format
      $scope.searchInput.startdate = time.getCurrent();

      // enddate needs to be at least 24 hours ahead of current date
      $scope.searchInput.enddate = time.getCurrent(24);
      // setting default times to 12pm
      $scope.searchInput.pickuptime = $scope.hoursList[12];
      $scope.searchInput.dropofftime = $scope.hoursList[12];
    }

    loadDefaultSearchInput();

    function updateInputForApi(searchInput) {
      var hotwireDateFormat = "MM/dd/yyyy";
      var hotwireTimeFormat = "HH:00";

      searchInput.startdate = time.updateFormat(searchInput.startdate, hotwireDateFormat);
      searchInput.enddate = time.updateFormat(searchInput.enddate, hotwireDateFormat);
      searchInput.pickuptime = time.updateFormat(searchInput.pickuptime.time, hotwireTimeFormat);
      searchInput.dropofftime = time.updateFormat(searchInput.dropofftime.time, hotwireTimeFormat);
      return searchInput;
    }

    function searchRentalCars() {
      // keeping $scope.searchInput in native date picker format
      var searchInputCopy = angular.copy($scope.searchInput);
      var hotwireFormattedInput = updateInputForApi(searchInputCopy);
      $scope.displayResults = true;
      $scope.loading = true;
      $scope.carResults = [];

      searchService.getCarRentals(hotwireFormattedInput, apiConstant).then(function successHandler(response) {
        $scope.loading = false;

        if (response.StatusCode === "0") {
          $scope.carResults = parseResults.addCarType(response);
        } else {
          console.error(response);
          response.Errors.length !== 0 ? $scope.apiErrors = response.Errors : $scope.singleError = response.StatusDesc;
        }
      }, epicFail);
    }

    function epicFail(response) {
      console.error(response);
      response ? $scope.singleError = response : $scope.singleError = "Hotwire is feeling ill.";
    }
  });
})();
