// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('autoApp', ['ionic']);

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
    controller: "MapCtrl",
    templateUrl: 'templates/map.html'
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