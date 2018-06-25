var mongoose=require('mongoose');
var BookingSchema=new mongoose.Schema({
Cab:Object,
Driver:Object,
Customer:Object,
BookingStatus:String,
Distance:String,
CabType:String,
Fare:Number,
PickupDate:String,
PickUpTime:String,
BookingType:String,
DestinationLocation:String,
PickupLocation:String,
BookingID:String
});
module.exports=mongoose.model('Booking',BookingSchema);
