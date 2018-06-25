angular.module('meanApp').factory('AuthenticationService',function($http,$sessionStorage,$cookies){
var service={
  Login:Login,
  Logout:Logout
}

return service;

function Login(user,callback){
  $http.post('/login',user).then(function(res){
if(res.data.success && res.data.token){
  console.log(res.data.userDetail);
$sessionStorage.tokenDetails={
  token:res.data.token
};
$http.defaults.headers.common.Authorization=res.data.token;
var ob={
  currentUser:{
    isLoggedIn:true,
    userInfo:{

      Email:res.data.userDetail.Email,
      FirstName:res.data.userDetail.FirstName,
      LastName:res.data.userDetail.LastName,
      usertype:res.data.userDetail.UserType,
      MobileNo:res.data.userDetail.MobileNo



    }
  }
};
$cookies.putObject('authUser',ob);
callback(res);
}
else
{
  callback(res);
}
});
}
function Logout(){
  delete $sessionStorage.tokenDetails;
  $http.defaults.headers.common.Authorization='';
  $cookies.remove('authUser');
  console.log('User Logged Out');
}
});
