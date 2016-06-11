(function() {
  'use strict';

  angular.module("rentCars")
  .controller("searchController", function($scope, searchSerice) {

    activate();

    function activate() {
      searchSerice.getCarRentals().then(function successHandler(response) {
        console.log(response)

      }, epicFail);
    }

    function epicFail(response) {
      console.error(response);
    }

  });
})();
