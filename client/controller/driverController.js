angular.module('meanApp').controller('driverController',function($scope, $http,$window,$cookies) {
  this.$window=$window;
var socket=io();




  $scope.initMap2=function(){
console.log($cookies.getObject('authUser').currentUser.userInfo);
var driver=$cookies.getObject('authUser').currentUser.userInfo;

socket.emit('getDriverInfo',{
  'msg':{
            driver:driver
          }
});

if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    }

    window.currentLocation="";

    function showPosition(position) {


        var origin2=position.coords.latitude + "," + position.coords.longitude;
console.log(origin2);
    window.myLat2=position.coords.latitude;
  window.myLng2=position.coords.longitude;





    var map2Options = {
        center:{lat:myLat2, lng:myLng2},
        zoom: 7,
       mapTypeId: google.maps.MapTypeId.ROADMAP

    };

     window.map2 = new google.maps.Map(document.getElementById('map2'), map2Options);



     console.log(myLat2);
     console.log(myLng2);

     var driverPosLat=myLat2;
     var driverPosLng=myLng2;

     var marker3Options = {
                position:{lat:myLat2, lng:myLng2},
                map: map2,
                animation: google.maps.Animation.DROP
            }
            var marker3 = new google.maps.Marker(marker3Options);

marker3.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');

socket.emit('getLocation',{
  'msg':{
            lat:driverPosLat,
            lng:driverPosLng
          }
});

}
  };


  socket.on('sendBookingInfo',function(data){
    $scope.DriverDisplay=data;
  var customerLat=parseFloat(data.msg.lat);
    var customerLng=parseFloat(data.msg.lng);
console.log(typeof customerLat);
    console.log('Customer Lat',data.msg.lat);
    var marker5Options = {
               position:{lat:customerLat, lng:customerLng},
               map: map2,
               animation: google.maps.Animation.DROP
           }
           window.marker5 = new google.maps.Marker(marker5Options);

    console.log(data.msg.Booking.CabType);
    console.log($scope.DriverDisplay);
document.getElementById('PickupLocation').value=$scope.DriverDisplay.msg.Booking.PickupLocation;
document.getElementById('DestinationLocation').value=$scope.DriverDisplay.msg.Booking.DestinationLocation;
document.getElementById('CustomerName').value=$scope.DriverDisplay.msg.Booking.Customer.FirstName;
document.getElementById('ContactNumber').value=$scope.DriverDisplay.msg.Booking.Customer.MobileNo;
document.getElementById('TotalFare').value=$scope.DriverDisplay.msg.Booking.Fare;

});


socket.on('CancelBooking',function(data){
console.log(data);
document.getElementById('PickupLocation').value='';
document.getElementById('DestinationLocation').value='';
document.getElementById('CustomerName').value='';
document.getElementById('ContactNumber').value='';
document.getElementById('TotalFare').value='';
  alert('Your Cab was cancelled by the customer');
marker5.setMap(null);
});
});
