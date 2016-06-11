(function() {
  'use strict';

  angular.module("rentCars")
  .service("searchSerice", function($q, $http, apiConstant, $httpParamSerializer) {

    this.getCarRentals = function() {
      var deferred = $q.defer();
      var url = "http://api.hotwire.com/v1/search/car?&dest=LAX&startdate=01/20/2017&enddate=01/23/2017&pickuptime=10:00&dropofftime=13:30";

      apiConstant = $httpParamSerializer(apiConstant);
      url = (url + "&" + apiConstant);

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
