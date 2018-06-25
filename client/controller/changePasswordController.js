angular.module('meanApp').controller('changePasswordController',['$rootScope','$scope','Flash','$timeout','$http',function($rootScope,$scope,Flash,$timeout,$http) {
    $scope.ChangePassword = function() {
      $http.get('/getEmail/'+$scope.Customer.Email+'/'+$scope.Customer.OldPassword).then(function(response) {
          if(response.status===200){

                    $http.put('/ChangePassword', $scope.Customer).then(function(response) {
                        if(response.status===200)
                        {
                          var message = '<strong>Awesome!</strong>  You changed your password successfully.';
                          Flash.create('success', message);
                        }

                      });
                    }
                  }
                      ,function(err){


                          var message = '<strong>Password / Email Id </strong> is not valid';
                          Flash.create('danger', message);
                        });

                      };
                    }]);
