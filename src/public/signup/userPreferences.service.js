angular.module('public')
.service('UserPreferenceService', function() {
  var service = this;
  var userPreferences = {};

  service.savePreferences = function(user) {
    userPreferences = user;
  };

  service.getPreferences = function() {
    return userPreferences;
  };

  service.isRegistered = function() {
    return !!userPreferences.email;
  };
});
