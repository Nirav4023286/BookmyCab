angular.module('meanApp').controller('tariffController', function($scope,$http,$mdDialog) {



var initTariff=function(){

console.log('Init executed');
  $http.get('/GetTariff').then(function(response) {

      $scope.TariffData = response.data;
  });
};

function validate() {
  var StartPeakHour=document.getElementById('StartPeakHour').value;
  var cabtype=document.getElementById('cabType').value;
  var StopPeakHour=document.getElementById('StopPeakHour').value;
  var normalrate=document.getElementById('normalrate').value;
  var peakrate=document.getElementById('peakrate').value;

if((StartPeakHour==''||null)||(cabtype==''||null)||(StopPeakHour==''||null)||(normalrate==''||null)||(peakrate==''||null))
{
  alert('Field(s) cannot be empty');
  return false;
}
else{
  return true;
}

}

function Updatevalidation(){

  var StartPeakHour=document.getElementById('UStartPeakHour').value;
  var cabtype=document.getElementById('UcabType').value;
  var StopPeakHour=document.getElementById('UStopPeakHour').value;
  var normalrate=document.getElementById('Unormalrate').value;
  var peakrate=document.getElementById('Upeakrate').value;

  if((StartPeakHour==''||null)||(cabtype==''||null)||(StopPeakHour==''||null)||(normalrate==''||null)||(peakrate==''||null))
  {
  alert('Field(s) cannot be empty');
  return false;
  }
  else{
  return true;
  }


}




    $scope.AddTariff=function(){


if(validate()){
$http.post('/AddTariff',$scope.Tariff).then(function(res){
  console.log('Tariff Data Saved');


});
$scope.Tariff="";
initTariff();
}
    };

    $http.get('/GetTariff').then(function(response) {
        $scope.TariffData = response.data;
    });

    $scope.GetTariff = function(t) {
      $scope.TariffId=t._id;
        $http.get('/GetTariff/' +t._id).then(function(response) {
                $scope.getTariff = response;
        });
      };






    $scope.UpdateTariff=function(){
if(Updatevalidation()){
      $http.put('/UpdateTariff/'+$scope.TariffId,$scope.getTariff.data).then(function(res){
        console.log('Tariff data edited');
      });
initTariff();
}
 };




    $scope.DeleteTariff = function(tariff,event) {

                     var confirm = $mdDialog.confirm()
                         .title('Are you sure to delete the record?')
                       .textContent('Record will be deleted permanently.')
                         .targetEvent(event)
                         .ok('Yes')
                         .cancel('No');
                         $mdDialog.show(confirm).then(function() {

      $http.delete('/DeleteTariff/' + tariff._id).then(function(response) {
                                    console.log('Deleted');
  initTariff();
                                });

                                              }, function() {
                             console.log('You decided to keep your record.');
                        });

     };

      $('#StartPeakHour').bootstrapMaterialDatePicker({
        format : 'HH:mm',
        date:false,
       time:true,
        });

        $('#StopPeakHour').bootstrapMaterialDatePicker({
          format : 'HH:mm',
          date:false,
         time:true,
          });





    });
