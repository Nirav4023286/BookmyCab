var myLatLng = {lat: 28.6139391, lng: 77.2090212};
var mapOptions = {
    center: myLatLng,
    zoom: 7,
   mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//create autocomplete object
 var input="";
 var destination="";
           input = document.getElementById("inputLoaction");
           destination=document.getElementById("inputDestination");
           var options = {
               types: ['(cities)']
           }
           var autocompletesource = new google.maps.places.Autocomplete(input, options);

           autocompletesource.addListener('place_changed',onPlaceChangedSource);
           function onPlaceChangedSource(){

               var place = autocompletesource.getPlace();
               map.panTo(place.geometry.location);
           }


           var autocompletedestination = new google.maps.places.Autocomplete(destination, options);

           autocompletedestination.addListener('place_changed',onPlaceChangedDestination);
           function onPlaceChangedDestination(){

               var place = autocompletedestination.getPlace();
               map.panTo(place.geometry.location);
           }


           //create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute(){
  input="";
  destination="";
  input = document.getElementById("inputLoaction").value;
  destination=document.getElementById("inputDestination").value;
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

        //Get distance and time
        window.alert("The travelling distance is " + result.routes[0].legs[0].distance.text + ".<br />The travelling time is: " + result.routes[0].legs[0].duration.text + ".");

        //display route
        directionsDisplay.setDirections(result);
    }
    });
}
