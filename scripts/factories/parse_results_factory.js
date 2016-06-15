(function() {
  'use strict';

  angular.module("rentCars")
  .factory("parseResults", function($filter){
    return {
      addCarType: function(data) {
        var results = data.Result;
        var carTypes = data.MetaData.CarMetaData.CarTypes;

        if (carTypes && results) {
          for (var i = 0; i < results.length; i++) {

            // pop filtered match from car types
            var carType = $filter("filter")(carTypes, results[i].CarTypeCode).pop();

            // add car type attributes to each rental car result
            results[i].CarTypeName = carType.CarTypeName;
            results[i].PossibleFeatures = carType.PossibleFeatures;
            results[i].PossibleModels = carType.PossibleModels;
            results[i].TypicalSeating = carType.TypicalSeating;
          }
        } else {
          return data.Result;
        }
        return results;
      }
    }
  });
})();
