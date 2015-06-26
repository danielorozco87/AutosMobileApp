// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('autoApp', ['ionic', 'ngCordova']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    controller: "HomeCtrl",
    templateUrl: 'templates/home.html'
  })
  .state('mainMenu', {
    url: '/mainMenu',
    controller: "MainMenuCtrl",
    templateUrl: 'templates/mainMenu.html'
  })

  .state('myCar', {
    url: '/myCar',
    controller: "MyCarCtrl",
    templateUrl: 'templates/myCar.html'
  })
  .state('services', {
    url: '/services',
    controller: "ServicesCtrl",
    templateUrl: 'templates/services.html'
  })

  .state('gasStation', {
    url: '/gasStation',
    controller: "GasStationCtrl",
    templateUrl: 'templates/gasStation.html'
  })

  .state('carItems', {
    url: '/carItems',
    controller: "CarItemsCtrl",
    templateUrl: 'templates/carItems.html'
  })
  .state('carDealership', {
    url: '/carDealership',
    controller: "CarDealershipCtrl",
    templateUrl: 'templates/carDealership.html'
  })

  .state('map', {
    url: '/map',
    cache: false,
    controller: "MapCtrl",
    templateUrl: 'templates/map.html',
    params: {
      mapType: null
    }
  })

  .state('markerInfo', {
    url: '/markerInfo',
    cache: false,
    controller: "MarkerInfoCtrl",
    templateUrl: 'templates/markerInfo.html',
    params: {
      mapMarkerInfo: null
    }
  });

  $urlRouterProvider.otherwise("/home");
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

/*app.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});*/