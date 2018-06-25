var express=require('express');
var router=express.Router();
var Tariff=require('../models/tariffModel');
router.post('/AddTariff',function(req,res){
var newTariff=new Tariff();
newTariff.CabType=req.body.CabType;
newTariff.NormalRate=req.body.NormalRate;
newTariff.PeakRate=req.body.PeakRate;
newTariff.StartPeakTime=req.body.StartPeakTime;
newTariff.StopPeakTime=req.body.StopPeakTime;

newTariff.save().then(function(docs){
  console.log('Tariff Data Saved ',docs);
},function(err){
  console.log(err);
});




});


router.get('/GetTariff', function(req, res) {
      Tariff.find({}, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.get('/GetTariff/:id',function(req,res) {
  Tariff.findById({
    _id:req.params.id
  },function(err,data){
    if(err){
      throw err;
    }
    else{
      res.json(data);
    }
  });

});

router.delete('/DeleteTariff/:id', function(req, res) {
    Tariff.remove({
        _id: req.params.id
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

router.put('/UpdateTariff/:id',function(req,res){
Tariff.findByIdAndUpdate({
  _id:req.params.id
},{
$set:{
  CabType:req.body.CabType,
  NormalRate:req.body.NormalRate,
  PeakRate:req.body.PeakRate,
  StartPeakTime:req.body.StartPeakTime,
  StopPeakTime:req.body.StopPeakTime
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
