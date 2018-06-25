angular.module('meanApp').controller('rideHistoryController', function($scope,$http,$window,$cookies) {
  this.$window=$window;
  
  $scope.initRides=function(){
    console.log($cookies.getObject('authUser').currentUser.userInfo);
var email=$cookies.getObject('authUser').currentUser.userInfo.Email;
console.log(email);
    $http.get('/getRides/'+email).then(function(response){
$scope.Rides=response.data;
      console.log(response.data);

    },function(err){
      console.log(err);
    });
  };
  });
