var express=require('express');
var router=express.Router();
var User=require('../models/UserModel');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('jsonwebtoken');



router.post('/AddDriver',function(req,res){

var newDriver=new User();

newDriver.UserType='Driver',
newDriver.Password=newDriver.generateHash('password'),
newDriver.MobileNo=req.body.MobileNo,
newDriver.Email=req.body.Email,
newDriver.LastName=req.body.LastName,
newDriver.FirstName=req.body.FirstName


newDriver.save().then(function(docs){
  console.log('User Data Saved',docs);
},function(err){
  console.log(err);
});

});

router.get('/getDriver',function(req,res){
  User.find({
    UserType:'Driver'
  },function(err,data) {
    if(err){
      throw err;
    }
    else{
      res.json(data);
    }
  });
});


router.get('/getDriver/:MobileNo',function(req,res){
  User.find({
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


router.delete('/DeleteDriver/:MobileNo', function(req, res) {
    User.remove({
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

router.post('/AddCustomer',function(req,res){



var newCustomer=new User();

  User.findOne({
Email:req.body.Email

  },function(err,data) {
    if(!data){



newCustomer.UserType='Customer',
newCustomer.Password=newCustomer.generateHash(req.body.Password),
newCustomer.MobileNo=req.body.MobileNo,
newCustomer.Email=req.body.Email,
newCustomer.LastName=req.body.LastName,
newCustomer.FirstName=req.body.FirstName

newCustomer.save().then(function(customer){
res.status(200).send(customer);
},function(err){
  res.status(400).send(err.errors.Email.message);
});




}
else{
  console.log('User Already Exists');
  res.status(403).send();
}

});

});

router.get('/getEmail/:Email/:OldPassword',function(req,res){
  User.find({
    Email: req.params.Email
  },function(err,data) {
    if(err){
      throw err;
    }
    else{
      if(!data){
        return res.status(404).send();
      }
      if(data){
        if(bcrypt.compareSync(req.params.OldPassword,data[0].Password)){
            res.status(200).send();
        }
      else{
        res.status(404).send();
      }
      }

    }
  });
});


router.put('/ChangePassword',function(req,res){
User.findOneAndUpdate({
    Email:req.body.Email
}, {
  $set:{
  Password:bcrypt.hashSync(req.body.NewPassword)
  }
}, {new: true}).then(function(Email){
   if (!Email)
   {
     return res.status(404).send();
   }

   res.send({Email});
 }).catch(function(e)
 {
   res.status(400).send();
 });
});



router.post('/login',function(req,res){
User.findOne({
  Email:req.body.Email
},function(error,user){
if(error){
  throw error;
}
else if(!user){
res.json({
  success:false,
  message:'Email ID is not found'
});
console.log('Email ID is not found');
}else if(!user.validPassword(req.body.Password)){ //validate password
res.json({
  success:false,
  message:'You entered a wrong password'
});
console.log('You entered a wrong password');

}else if(user){
  var token=jwt.sign(user,'mysecret',{ //creating jwt token
    expiresIn:2000
  });
res.json({  //sending token details
  token:token,
  isLoggedIn:true,
userDetail:user,
  success:true
});
console.log('Token has been created');
}
});
});

router.put('/UpdateDriver/:id',function(req,res){
User.findByIdAndUpdate({
  _id:req.params.id
},{
$set:{

  MobileNo:req.body.MobileNo,
  Email:req.body.Email,
  LastName:req.body.LastName,
  FirstName:req.body.FirstName
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

router.post('/AddAdmin',function(req,res){

var newAdmin=new User();

newAdmin.UserType='Admin',
newAdmin.Password=newAdmin.generateHash('admin'),
newAdmin.MobileNo=req.body.MobileNo,
newAdmin.Email=req.body.Email,
newAdmin.LastName=req.body.LastName,
newAdmin.FirstName=req.body.FirstName


newAdmin.save().then(function(docs){
  console.log('User Data Saved',docs);
},function(err){
  console.log(err);
});

});





module.exports=router;
