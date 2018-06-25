angular.module('meanApp').controller('NavigationController', function($rootScope,$scope,$cookies,$http,$mdDialog,AuthenticationService) {
var navigation=this;
navigation.userName='';
navigation.userType='';
navigation.isLoggedIn=false;
initController();

function initController(){
var authUser=$cookies.getObject('authUser');
if(authUser!=undefined){
  var loggedInUser=authUser.currentUser.userInfo;
  var isLoggedIn=authUser.currentUser.isLoggedIn;
  if(isLoggedIn){
navigation.isLoggedIn=isLoggedIn;
navigation.userName=loggedInUser.FirstName;
navigation.userType=loggedInUser.usertype;
}
}
else{
  navigation.isLoggedIn=false;
}
}
$scope.LoginUser=function(){
  initController();
}

$rootScope.$on('CallLoginUser',function(){
$scope.LoginUser();
});

  $scope.LogoutUser = function() {
    console.log('logout function');
          AuthenticationService.Logout();
          navigation.isLoggedIn=false;
      };

  });
