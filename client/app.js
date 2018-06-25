var app = angular.module('meanApp', ['ngRoute','ngFlash','ngAnimate', 'ngStorage', 'ngCookies','ngMaterial']);
app.config(function($routeProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
    $routeProvider.when('/tariff', {
        templateUrl: './views/tariff.html',
        controller: 'tariffController'
    }).when('/addcab',{
      templateUrl: './views/addcab.html',
      controller: 'addCabController'
    }).when('/signup',{
      templateUrl: './views/signup.html',
      controller: 'SignUpController'
    }).when('/changePassword',{
      templateUrl: './views/changePassword.html',
      controller: 'changePasswordController'
    }).when('/login',{
      templateUrl: './views/login.html',
      controller: 'loginController'
    }).when('/booking',{
      templateUrl: './views/booking.html',
      controller: 'bookingController'
    }).when('/driver', {
        templateUrl: './views/driver.html',
        controller: 'driverController'
    }).when('/rideHistory', {
        templateUrl: './views/rideHistory.html',
        controller: 'rideHistoryController'
    }).when('/home', {
        templateUrl: './views/home.html'
    }).when('/unauthorized', {
        templateUrl: './views/unauthorized.html'
    });
});

app.run(function($rootScope,$cookies,$http,$location,$sessionStorage){
  if($sessionStorage.tokenDetails){
    $http.defaults.headers.common.Authorization=$sessionStorage.tokenDetails.token;
  }

$rootScope.$on('$locationChangeStart',function(event,next,current){
var CustomerViews=['/changePassword','/booking','/rideHistory','/home'];
var DriverViews=['/changePassword','/driver','/home'];
var AdminViews=['/changePassword','/tariff','/addcab','/home'];
var PublicViews=['/signup','/login','/home'];
var authUser=$cookies.getObject('authUser');
if(authUser!=undefined){
  var loggedInUser=authUser.currentUser.userInfo;
}
var viewsRestrict=PublicViews.indexOf($location.path())=== -1;
if(!$sessionStorage.tokenDetails && viewsRestrict && $location.path() !==''){
$location.path('/login');
}else{
if(authUser !=undefined){
  if(authUser.currentUser.userInfo.usertype =='Customer'){
    var Customer=CustomerViews.indexOf($location.path())=== -1;
    if(Customer){
      $location.path('/unauthorized');
    }
  }
  if(authUser.currentUser.userInfo.usertype =='Admin'){
    var Admin=AdminViews.indexOf($location.path())=== -1;
    if(Admin){
      $location.path('/unauthorized');
    }
  }
  if(authUser.currentUser.userInfo.usertype =='Driver'){
    var Driver=DriverViews.indexOf($location.path())=== -1;
    if(Driver){
      $location.path('/unauthorized');
      }
    }
  }
}



});


});
