angular.module('public')
.controller('SignUpController', ['$http', 'UserPreferenceService', function($http, UserPreferenceService) {
  var vm = this;
  vm.user = {};
  vm.menuNumberInvalid = false;
  vm.saveSuccess = false;

  vm.submitForm = function(form) {
    if (form.$valid) {
      var url = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';
      $http.get(url).then(function(response) {
        if (response.data) {
          var menuItems = response.data;
          var foundItem = null;
          var categ = null;

          // Itera su tutte le categorie
          angular.forEach(menuItems, function(category) {
            // Itera su tutti i menu_items nella categoria
            angular.forEach(category.menu_items, function(item) {
              if (item.short_name === vm.user.menuNumber) {
                foundItem = item;
                categ = category.category;
              }
            });
          });

          if (foundItem) {
            vm.menuNumberInvalid = false;
            // Salva le preferenze dell'utente includendo il menu trovato
            UserPreferenceService.savePreferences({
              ...vm.user,
              favoriteMenuItem: foundItem,
              category: categ
            });
            vm.saveSuccess = true;
          } else {
            vm.menuNumberInvalid = true;
          }
        }
      }).catch(function(error) {
        console.error('Error:', error);
      });
    }
  };
}]);
