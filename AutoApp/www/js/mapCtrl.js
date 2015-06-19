app.controller('MapCtrl', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup, $cordovaGeolocation, $compile) {
	$ionicLoading.show({
      noBackdrop: false,
      template: '<ion-spinner icon="android"/>'
    });

	$http.get("http://www.fourhats.com.ar/autoapp/wp-json/posts?type=" + $stateParams.mapType, { })
        .success(function(posts) {
            $scope.posts = posts;
      			$ionicLoading.hide();
        })
        .error(function (e) {
            $ionicLoading.hide();

            $ionicPopup.alert({
              title: 'Error al obtener los datos',
      			  template: "Intente nuevamente más tarde"
      			});
  });

  $scope.mapCreated = function(map) {
      $scope.map = map;
    };

    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
          console.log("There is no map");
          return;
      }

      $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Got pos', pos);
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide();
      }, function (error) {
          alert('Unable to get location: ' + error.message);
      });
    };});