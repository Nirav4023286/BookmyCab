var mongoose=require('mongoose');
var tariffSchema=mongoose.Schema({
CabType:String,
NormalRate:Number,
PeakRate:Number,
StartPeakTime:String,
StopPeakTime:String
});

module.exports=mongoose.model('tariff',tariffSchema);
