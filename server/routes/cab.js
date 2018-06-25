var express=require('express');
var router=express.Router();
var Cab=require('../models/CabModel');

router.post('/AddCab',function(req,res){

newCab=new Cab();
newCab.MobileNo=req.body.MobileNo,
newCab.RegisterNo=req.body.RegisterNo,
newCab.Model=req.body.Model,
newCab.Make=req.body.Make,
newCab.CabType=req.body.CabType,
newCab.LicenseNo=req.body.LicenseNo,
newCab.Address=req.body.Address

newCab.save().then(function(docs){
  console.log('Cab Data Saved',docs);
},function(err){
  console.log(err);
});

});


router.delete('/DeleteCab/:MobileNo', function(req, res) {
    Cab.remove({
        MobileNo: req.params.MobileNo
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

router.get('/getCabDetail/:MobileNo',function(req,res){
  Cab.find({
    MobileNo: req.params.MobileNo
  },function(err,data) {
    if(err){
      throw err;
    }
    else{
      res.json(data);
    }
  });
});

router.put('/UpdateCab/:id/:MobileNo',function(req,res){
Cab.findByIdAndUpdate({
  _id:req.params.id
},{
$set:{

  MobileNo:req.params.MobileNo,
  RegisterNo:req.body.RegisterNo,
  Model:req.body.Model,
  Make:req.body.Make,
  CabType:req.body.CabType,
  LicenseNo:req.body.LicenseNo,
  Address:req.body.Address


}
},{
    upsert: true
  },
  function(err, docs) {
    if (err)
 console.log(err);
  else {
res.status(200).json(docs);
console.log(docs);
}
});

});








module.exports=router;
