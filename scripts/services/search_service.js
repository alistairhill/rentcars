(function() {
  'use strict';

  angular.module("rentCars")
  .service("searchSerice", function($q, $http, $httpParamSerializer) {

    this.getCarRentals = function(searchInput, apiConstant) {
      var deferred = $q.defer();
      var url = "http://api.hotwire.com/v1/search/car?";

      searchInput = $httpParamSerializer(searchInput);
      apiConstant = $httpParamSerializer(apiConstant);

      url = (url + apiConstant + "&" + searchInput);

      $http.jsonp(url)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          deferred.reject(data);
        });
      return deferred.promise;
    }

  });
})();
