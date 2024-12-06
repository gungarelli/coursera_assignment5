angular.module('public')
.controller('MyInfoController', ['UserPreferenceService', '$state', function(UserPreferenceService, $state) {
  var vm = this;
  vm.userPreferences = UserPreferenceService.getPreferences();

  vm.isRegistered = UserPreferenceService.isRegistered();
  
  if (!vm.isRegistered) {
    vm.message = "Not Signed Up Yet. Sign up Now!";
    vm.signUpLink = function() {
      $state.go('signup');
    };
  };
}]);
