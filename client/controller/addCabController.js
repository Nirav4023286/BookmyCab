angular.module('meanApp').controller('addCabController', function($scope,$http,$mdDialog) {

  var initCab=function(){

    $http.get('/getDriver').then(function(response) {
      console.log('initCab executed');
        $scope.DriverData = response.data;
    });
};

function validation() {
  var Lname=document.getElementById('Lname').value;
  var Fname=document.getElementById('Fname').value;
  var address=document.getElementById('address').value;
  var mobile=document.getElementById('mobile').value;
  var email=document.getElementById('email').value;
  var license=document.getElementById('license').value;
  var cabtype=document.getElementById('cabtype').value;
  var make=document.getElementById('make').value;
  var model=document.getElementById('model').value;
  var registration=document.getElementById('registration').value;




  if((Lname==''||null) || (Fname==''||null) || (mobile==''||null) || (email==''||null) || (license==''||null) || (cabtype==''||null) || (make==''||null) || (model==''||null) || (registration==''||null))
  {
    alert('Field(s) cannot be empty');
    return false;

  }
  else{
    return true;
  }


}




function Updatevalidation() {
  var Lname=document.getElementById('ULname').value;
  var Fname=document.getElementById('UFname').value;
  var address=document.getElementById('Uaddress').value;
  var mobile=document.getElementById('Umobile').value;
  var email=document.getElementById('Uemail').value;
  var license=document.getElementById('Ulicense').value;
  var cabtype=document.getElementById('Ucabtype').value;
  var make=document.getElementById('Umake').value;
  var model=document.getElementById('Umodel').value;
  var registration=document.getElementById('Uregistration').value;




  if((Lname==''||null) || (Fname==''||null) || (mobile==''||null) || (email==''||null) || (license==''||null) || (cabtype==''||null) || (make==''||null) || (model==''||null) || (registration==''||null))
  {
    alert('Field(s) cannot be empty');
    return false;

  }
  else{
    return true;
  }


}


$scope.AddCab=function(){



if(validation()){
$http.post('/AddDriver',$scope.Driver).then(function(res){
  console.log('Driver Data Saved');
});


$http.post('/AddCab',$scope.Driver).then(function(res){
  console.log('Cab Data Saved');
});

initCab();
$scope.Driver='';
}
};



    $http.get('/getDriver').then(function(response) {
      console.log(response.data);
        $scope.DriverData = response.data;
    });





    $scope.GetDriver= function(t) {
      $scope.DriverMobile=t.MobileNo;
        $http.get('/getDriver/'+t.MobileNo).then(function(response) {

            console.log(response.data);
                $scope.getDriver= response.data;
        });

        $http.get('/getCabDetail/'+t.MobileNo).then(function(response) {

                console.log(response.data);
                $scope.getCab= response.data;
        });




      };


          $scope.UpdateCabDetails=function(){
if(Updatevalidation){
            $http.put('/UpdateCab/'+$scope.getCab[0]._id+'/'+$scope.getDriver[0].MobileNo,$scope.getCab[0]).then(function(res){
              console.log('Cab data edited');
            });
            $http.put('/UpdateDriver/'+$scope.getDriver[0]._id,$scope.getDriver[0]).then(function(res){
              console.log('Driver data edited');
            });


          initCab();
}
       };




    $scope.DeleteCab = function(d,event) {
      var confirm = $mdDialog.confirm()
          .title('Are you sure to delete the record?')
        .textContent('Record will be deleted permanently.')
          .targetEvent(event)
          .ok('Yes')
          .cancel('No');
          $mdDialog.show(confirm).then(function() {
      $http.delete('/DeleteDriver/' + d.MobileNo).then(function(response) {
          console.log('Driver Deleted');
      });

        $http.delete('/DeleteCab/' + d.MobileNo).then(function(response) {
            console.log('Cab Deleted');
        });

        initCab();
}, function() {
console.log('You decided to keep your record.');
});
      };

    });
