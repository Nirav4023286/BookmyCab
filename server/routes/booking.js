var express=require('express');
var router=express.Router();
var Booking=require('../models/BookingModel');

router.post('/AddBookingLater',function(req,res){
var booking=new Booking();


booking.Cab=req.body.Cab,
booking.Driver=req.body.Driver,
booking.Customer=req.body.Customer,
booking.BookingStatus='Booked',
booking.Distance=req.body.Distance,
booking.CabType=req.body.CabType,
booking.Fare=req.body.Fare,
booking.PickupDate=req.body.PickupDate,
booking.PickUpTime=req.body.PickUpTime,
booking.BookingType='HOLD',
booking.DestinationLocation=req.body.DestinationLocation,
booking.PickupLocation=req.body.PickupLocation,
booking.BookingID=req.body.BookingID



booking.save().then(function(data){
res.status(200).send(data);
},function(err){

res.status(400).send(err);


});
});

router.post('/AddBookingNow',function(req,res){
var BookNow=new Booking();


BookNow.Cab=req.body.Cab,
BookNow.Driver=req.body.Driver,
BookNow.Customer=req.body.Customer,
BookNow.BookingStatus='Booked',
BookNow.Distance=req.body.Distance,
BookNow.CabType=req.body.CabType,
BookNow.Fare=req.body.Fare,
BookNow.PickupDate=req.body.PickupDate,
BookNow.BookingType='Current',
BookNow.PickUpTime=req.body.PickUpTime,
BookNow.DestinationLocation=req.body.DestinationLocation,
BookNow.PickupLocation=req.body.PickupLocation,
BookNow.BookingID=req.body.BookingID



BookNow.save().then(function(data){
res.status(200).send(data);
},function(err){

res.status(400).send(err);


});
});
router.get('/getRides/:email',function(req,res) {
Booking.find({
  'Customer.Email':req.params.email

  },function(err,data){
    if(!data){
      return res.status(404).send();
    }

    else if(data){
    return res.status(200).json(data);
    }
    else{
    return res.status(404).send(err);
    }
  });

});

router.delete('/DeleteBooking/:BookingID', function(req, res) {
  Booking.remove({
      BookingID:req.params.BookingID
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Deleted');
        }
    });
});




module.exports=router;
