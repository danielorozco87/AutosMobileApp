app.controller('MarkerInfoCtrl', function($scope, $state, $stateParams, $http, $ionicLoading, $ionicPopup, $cordovaGeolocation, $ionicPlatform) {
	$ionicLoading.show({
    	noBackdrop: false,
    	template: '<ion-spinner icon="android"/>'
  	});

	$scope.post = $stateParams.mapMarkerInfo;

	var myLatlng = new google.maps.LatLng($scope.post.location.lat, $scope.post.location.lng);

  	var mapOptions = {
    	center: myLatlng,
      	zoom: 16,
      	mapTypeId: google.maps.MapTypeId.ROADMAP
  	};

  	var map = new google.maps.Map(document.getElementById("marketInfoMap"), mapOptions);

  	function startMarkersAndMap() {
    	setTimeout(function() {
      		if(map) {
          		var myLocation = new google.maps.Marker({
                	position: new google.maps.LatLng($scope.post.location.lat, $scope.post.location.lng),
                  	map: map,
                  	icon: 'img/pins/' + $stateParams.mapCategory + '.png'
              	});

              	google.maps.event.trigger(map, 'resize');

              	$ionicLoading.hide();
            } else {
        		startMarkersAndMap();
      		}
    	},500);
  	};

	$ionicPlatform.ready(function() {
    	startMarkersAndMap()
  	});
});