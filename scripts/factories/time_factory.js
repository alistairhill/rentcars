(function() {
  'use strict';

  angular.module("rentCars")
  .factory("time", function($filter){
    return {
      getCurrent: function(addHours) {
        addHours = addHours || 0;
        var currentTime = new Date();

        // adding required 3 hours time ahead by default
        var bookingHoursAhead = 3;
        currentTime.setHours(currentTime.getHours() + bookingHoursAhead + addHours);
        return currentTime;
      },
      updateFormat: function(time, format) {
        return $filter('date')(time, format);
      },
      makeHoursList: function() {
        var currentTime = new Date();
        var listOfHourObjects = [];
        var amPmTimeFormat = "h:00 a";
        var hoursInTheDay = 24;
        currentTime.setHours(0,0,0,0);
        for (var i = 0; i < hoursInTheDay; i++) {
          var timeObj = {
            time: currentTime.setHours(i,0,0,0),
            label: this.updateFormat(currentTime.setHours(i,0,0,0), amPmTimeFormat)
          }
          listOfHourObjects.push(timeObj);
        }
        return listOfHourObjects;
      }
    }
  });
})();
