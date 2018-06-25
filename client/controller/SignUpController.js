angular.module('meanApp').controller('SignUpController',['$rootScope','$scope','Flash','$timeout','$http',function($rootScope,$scope,Flash,$timeout,$http) {
    $scope.SaveCustomer = function() {
        $http.post('/AddCustomer', $scope.Customer).then(function(response) {

              if(response.status===200);
                var message = '<strong>Awesome!</strong>  You registered successfully.';
                Flash.create('success', message);

         },function(err){
           if(err.status===403)
           {
             var message = '<strong>Email Already Exists !!</strong> ';
             Flash.create('danger', message);
           }
           if(err.status===400)
           {
             var message =JSON.stringify(err.data,undefined,2);
             Flash.create('danger', message);
           }
         });
    };
}]);
