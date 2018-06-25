angular.module('meanApp').controller('bookingController', function($scope, $http,$window,$cookies,$mdDialog) {
  this.$window=$window;
  $scope.Booking={};
var socket=io();
tariff={};
window.currentDate=new Date();
window.distance;
window.duration;
window.driverLat;
window.driverLng;
window.myLat;
window.myLng;

  $scope.initMap=function(){
$scope.BookingsNow=false;
$scope.BookingsLater=false;
$scope.GetEstimate=false;
    console.log($cookies.getObject('authUser').currentUser.userInfo);
$scope.Booking.Customer=$cookies.getObject('authUser').currentUser.userInfo;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
window.currentLocation="";
function showPosition(position) {
window.origin=position.coords.latitude + "," + position.coords.longitude;
myLat=position.coords.latitude;
myLng=position.coords.longitude;
var mapOptions = {
        center:{lat:myLat,lng:myLng},
        zoom: 7,
       mapTypeId: google.maps.MapTypeId.ROADMAP
};
window.map = new google.maps.Map(document.getElementById('map'), mapOptions);

     window.geocoder = new google.maps.Geocoder;
  window.infowindow = new google.maps.InfoWindow;

geocodeLatLng1(geocoder, map, infowindow);

     console.log(myLat);
     console.log(myLng);

     var marker1Options = {
                position:{lat:myLat, lng:myLng},
                draggable: true,
                animation: google.maps.Animation.DROP

            }
            window.marker1 = new google.maps.Marker(marker1Options);
marker1.setMap(map);
socket.on('sendLocation',function(data){
  console.log(data.msg);
  driverLat=data.msg.lat;
  driverLng=data.msg.lng;


//driver marker
var marker4Options = {
           position:{lat:data.msg.lat, lng:data.msg.lng},
           map: map,
           animation: google.maps.Animation.DROP

       }
       window.marker4 = new google.maps.Marker(marker4Options);

marker4.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');


});
socket.on('sendDriverInfo',function(data){
  console.log(data.msg);
console.log('Mobile No: ',data.msg.driver.MobileNo);
$scope.Booking.Driver=data.msg.driver;
$http.get('/getCabDetail/'+data.msg.driver.MobileNo).then(function(response) {

        console.log('Hello Cab Details');
        console.log(response);

         $scope.Booking.Cab=response.data[0];
});

});

            google.maps.event.addListener(marker1, 'dragend', function(evt){
                console.log('Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3));
                myLat=evt.latLng.lat().toFixed(3);
                myLng=evt.latLng.lng().toFixed(3);
                window.origin=myLat+","+myLng;
                geocodeLatLng1(geocoder, map, infowindow);
            });

            google.maps.event.addListener(marker1, 'dragstart', function(evt){
              console.log('Currently dragging marker');
            });


    window.input="";
    window.destination="";

              input = document.getElementById("inputLocation");
              destination=document.getElementById("inputDestination");

              var autocompletesource = new google.maps.places.Autocomplete(input);
              autocompletesource.bindTo('bounds', map);

              autocompletesource.addListener('place_changed',onPlaceChangedSource);
              function onPlaceChangedSource(){
                  console.log('Hello changed Source');


                  var place = autocompletesource.getPlace();
                  map.panTo(place.geometry.location);
              }


              var autocompletedestination = new google.maps.places.Autocomplete(destination);
              autocompletedestination.bindTo('bounds', map);
              autocompletedestination.addListener('place_changed',onPlaceChangedDestination);
              function onPlaceChangedDestination(){
              console.log('Hello changed Dest');
                  var place = autocompletedestination.getPlace();
                  map.panTo(place.geometry.location);
              }



                            //create a DirectionsService object to use the route method and get a result for our request
                window.directionsService = new google.maps.DirectionsService();

                  //create a DirectionsRenderer object which we will use to display the route
                  window.directionsDisplay = new google.maps.DirectionsRenderer();

                  //bind the DirectionsRenderer to the map
                  directionsDisplay.setMap(map);

}




function geocodeLatLng1(geocoder, map, infowindow) {
  var input =origin;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        infowindow.setContent(results[1].formatted_address);
document.getElementById("inputLocation").value=results[1].formatted_address.toString();




        infowindow.open(map, marker1);

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


}
    //define calcRoute function


$scope.calcRoute=function(){
$scope.GetEstimate=true;

  socket.emit('getBookingID',{
    'msg':{
              bookingID:'getBookingID'
            }
  });
  socket.on('sendBookingID',function(data){
    console.log('BookingID:',data);
    $scope.Booking.BookingID=data;
    console.log('Booking ID:',$scope.Booking.BookingID);
  });

      console.log(currentDate);
window.currentTime=currentDate.getHours()+":"+currentDate.getMinutes();
console.log(currentTime);
     input="";
     destination="";
     input = document.getElementById("inputLocation").value;
     console.log(`Input is:${input}`);
     destination=document.getElementById("inputDestination").value;
     console.log(`Destination is:${destination}`);

     distance=document.getElementById("distance");
     duration=document.getElementById("duration");



       var request = {
           origin: input,
           destination: destination,
           travelMode: google.maps.TravelMode.DRIVING,
           unitSystem: google.maps.UnitSystem.METRIC
       }

       //pass the request to the route method
       directionsService.route(request, function(result, status){
       if(status == google.maps.DirectionsStatus.OK){
           console.log(result);
     marker1.setMap(null);
           //Get distance and time

          //  distance.value=result.routes[0].legs[0].distance.text;
          distance.value=result.routes[0].legs[0].distance.text;
           duration.value=result.routes[0].legs[0].duration.text;
           //display route
          directionsDisplay.setDirections(result);
     $scope.Booking.Distance=result.routes[0].legs[0].distance.value/1000;

     }


       $http.get('/GetTariff').then(function(response) { //BookNow Tariff Calculation
           console.log(response.data);
           tariff=response.data;
           console.log(tariff.length);
           for(i=0;i<tariff.length;i++){
             if($scope.Booking.CabType==tariff[i].CabType){
               if(currentTime>=tariff[i].StartPeakTime && currentTime<=tariff[i].StopPeakTime)
       {
         $scope.Booking.Fare=Math.ceil(tariff[i].PeakRate*result.routes[0].legs[0].distance.value/1000);
       }
       else{
         $scope.Booking.Fare=Math.ceil(tariff[i].NormalRate*result.routes[0].legs[0].distance.value/1000);
       }
             }
           }




       });
});
    }

function closestCab(custLat, custLong, driverLat, driverLong) {
  var pos = 0.017453292519943295;
  var calc = Math.cos;
  var adjust = 0.5 - calc((driverLat - custLat) * pos) / 2 + calc(custLat * pos) * calc(driverLat * pos)*(1 - calc((driverLong - custLong) * pos)) / 2;
  return 12742 * Math.asin(Math.sqrt(adjust));
}

$scope.BookNow=function(){

console.log(typeof $scope.Booking.Driver);
if(typeof $scope.Booking.Driver=='undefined'){
  alert('No cabs available at this moment');
  return false;
}
  if($scope.Booking.Cab.CabType!=$scope.Booking.CabType){
    alert('No cabs of selected type available at this moment');
    return false;
  }

  if(closestCab(myLat, myLng, driverLat, driverLng)>=1){
    alert('No cabs available within 1km');
    return false;
  }
$scope.BookingsNow=true;
  $scope.Booking.PickUpTime=currentTime;
  $scope.Booking.PickupDate=currentDate.toDateString();
  $scope.Booking.PickupLocation=input;
  $scope.Booking.DestinationLocation=destination;

  var Booking=$scope.Booking;
  console.log('Booking:',Booking);
  $http.post('/AddBookingNow',$scope.Booking).then(function(res){
    console.log('BookingNow Data Saved');
    if(res.status===200){
      alert('Your cab has been booked . Enjoy your ride ! ');
    }

document.getElementById('drivername').value=$scope.Booking.Driver.FirstName;
document.getElementById('contact').value=$scope.Booking.Driver.MobileNo;
document.getElementById('vehicle').value=$scope.Booking.Cab.Model;


});

socket.emit('getBookingInfo',{
  'msg':{
            Booking:Booking,
            lat:myLat,
            lng:myLng
          }
});



};



$scope.BookLaterButton=function(){

  document.getElementById("fare").value="";
  document.getElementById("fare2").value="";
}


    $scope.BookLater=function(){

      $scope.BookingsLater=true;

      console.log(currentDate);
     input = document.getElementById("inputLocation").value;
     console.log(`Input is:${input}`);
     destination=document.getElementById("inputDestination").value;
     console.log(`Destination is:${destination}`);



      $scope.Booking.PickupLocation=input;
      $scope.Booking.DestinationLocation=destination;

$http.post('/AddBookingLater',$scope.Booking).then(function(res){
  console.log('BookingLater Data Saved');
  if(res.status===200){
    alert('Your ride has been booked');
  }
  });


    };
$scope.BookLaterEstimate=function(){
  var fare=document.getElementById("fare").value;
  var fare2=document.getElementById("fare2").value;
$http.get('/GetTariff').then(function(response) {
      console.log(response.data);
      tariff=response.data;
      console.log(tariff.length);
      for(i=0;i<tariff.length;i++){
        if($scope.Booking.CabType==tariff[i].CabType){
          if($scope.Booking.PickUpTime>=tariff[i].StartPeakTime && $scope.Booking.PickUpTime<=tariff[i].StopPeakTime)
  {
    $scope.Booking.Fare=Math.ceil(tariff[i].PeakRate*$scope.Booking.Distance);
  document.getElementById("fare").value=Math.ceil(tariff[i].PeakRate*$scope.Booking.Distance);
    document.getElementById("fare2").value=Math.ceil(tariff[i].PeakRate*$scope.Booking.Distance);
    console.log(`Peak Time ${i}: `,$scope.Booking.PickUpTime);
  }
  else{
    $scope.Booking.Fare=Math.ceil(tariff[i].NormalRate*$scope.Booking.Distance);
  document.getElementById("fare").value=Math.ceil(tariff[i].NormalRate*$scope.Booking.Distance);
  document.getElementById("fare2").value=Math.ceil(tariff[i].NormalRate*$scope.Booking.Distance);

    console.log(`Normal Time ${i}: `,$scope.Booking.PickUpTime);
  }
        }
      }


  console.log('Finally :',$scope.Booking);

  });

  console.log('Rate : ',$scope.Booking.Distance);

};
$scope.DeleteBooking = function(d,event) {




  var confirm = $mdDialog.confirm()
      .title('Are you sure you want to cancel your ride?')
    .textContent('Your ride will be cancelled.')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $scope.Booking='';
        document.getElementById('distance').value='';
        document.getElementById('duration').value='';
        document.getElementById('drivername').value='';
        document.getElementById('contact').value='';
        document.getElementById('vehicle').value='';
        $scope.initMap();
        socket.emit('CancelBooking',{
          'msg':{
                    Booking:'Booking Cancelled'
                  }
        });
  $http.delete('/DeleteBooking/'+d).then(function(response) {
      console.log('Booking Deleted');
  });
}, function() {
console.log('You decided to keep your record.');
});

};

    $(document).ready(function(){
      $("#bookingDate").datepicker({
         showAnim: "fadeIn",
       numberOfMonths: 1,
         dateFormat: "D M dd yy",
         minDate: +0,
         maxDate: "1D",
       });
$('#bookingTime').bootstrapMaterialDatePicker({
  format : 'HH:mm',
  date:false,
 time:true,
  });
    });
  });
