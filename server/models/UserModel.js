var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var validator=require('validator');
var UserSchema=new mongoose.Schema({

UserType:{
type:String
},
Password:{
type:String,
minlength:4,
required:true,
trim:true
},
MobileNo:{
type:String,
unique:true,
required:true
},
Email:{
type:String,
required:true,
unique:true,
trim:true,
validate:{
validator:validator.isEmail,
message:'{VALUE} is not a valid Email id'
}
},
LastName:{
type:String,
required:true
},
FirstName:{
type:String,
required:true
}

});

UserSchema.methods.generateHash=function(Password)
{
  return bcrypt.hashSync(Password,bcrypt.genSaltSync(8),null);

};

UserSchema.methods.validPassword=function(Password){

  return bcrypt.compareSync(Password,this.Password);

}




module.exports=mongoose.model('User',UserSchema);
