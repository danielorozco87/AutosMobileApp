app.controller('MapCtrl', function($scope, $state, $stateParams, $http, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicPlatform) {
  $scope.hasSettedMarks = false;

  $ionicLoading.show({
    noBackdrop: false,
    template: '<ion-spinner icon="android"/>'
  });

  $http.get("http://www.fourhats.com.ar/autoapp/wp-json/posts?type=" + $stateParams.mapType, { })
    .success(function(posts) {
        $scope.posts = posts;
        $scope.hasSettedMarks = true;
        $ionicLoading.hide();
    })
    .error(function (e) {
      $ionicLoading.hide();

      $ionicPopup.alert({
        title: 'Error al obtener los datos',
        template: "Intente nuevamente más tarde"
      });
  });

  var myLatlng = new google.maps.LatLng(-34.574291, -58.431087);

  var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  function setMarkers() {
    angular.forEach($scope.posts, function(post, key) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(post.acf.location.lat, post.acf.location.lng),
            map: map
        });

        google.maps.event.addListener(marker, 'click', function() {
          $state.go('markerInfo', { mapMarkerInfo: post });
        });
    }, function(){});
  };

  function startMarkersAndMap() {
    setTimeout(function() {
      if($scope.hasSettedMarks && map) {
          setMarkers();

          $cordovaGeolocation.getCurrentPosition({enableHighAccuracy: false})
            .then(function (pos) {
              var myLocation = new google.maps.Marker({
                  position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                  map: map
              });

              google.maps.event.trigger(map, 'resize');
              map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            }, function(err) {
              // error
            });
      } else {
        startMarkersAndMap();
      }
    },500);
  };

  $ionicPlatform.ready(function() {
    startMarkersAndMap()
  });
});