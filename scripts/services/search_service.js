(function() {
  'use strict';

  angular.module("rentCars")
  .service("searchSerice", function($q, $http) {

    this.getCarRentals = function() {
      var deferred = $q.defer();
      var url = "http://api.hotwire.com/v1/search/car?apikey=x5xhvsgm3tzf2s7gh7qm8y6e&dest=LAX&startdate=01/20/2017&enddate=01/23/2017&pickuptime=10:00&dropofftime=13:30&format=jsonp&callback=JSON_CALLBACK";

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
