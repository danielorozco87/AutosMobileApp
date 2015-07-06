app.controller('MapCtrl', function($scope, $state, $stateParams, $http, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicPlatform) {
  $scope.hasSettedMarks = false;

  $ionicLoading.show({
    noBackdrop: false,
    template: '<ion-spinner icon="android"/>'
  });

  $http.get("http://fourhats.com.ar/autoapp/api/index.php?type=" + $stateParams.mapType + ($stateParams.mapCategory ? ("&category=" + $stateParams.mapCategory) : ""))
    .success(function(posts) {
        $scope.posts = posts;
        $scope.hasSettedMarks = true;
    })
    .error(function (e) {
      if(e && e.length) {
        $scope.posts = e;
        $scope.hasSettedMarks = true;
      } else { 
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error al obtener los datos',
          template: "Intente nuevamente más tarde"
        });
      }
  });

  var myLatlng = new google.maps.LatLng(-34.574291, -58.431087);

  var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    function setMarkers() {
	      var image = 'img/pins/' + $stateParams.mapCategory + '.png';
        angular.forEach($scope.posts, function(post, key) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(post.location.lat, post.location.lng),
              map: map,
			        icon: image
        });

        google.maps.event.addListener(marker, 'click', function() {
          $state.go('markerInfo', { mapMarkerInfo: post, mapCategory: $stateParams.mapCategory });
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

              $ionicLoading.hide();
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