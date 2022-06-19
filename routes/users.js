var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {UserDetails} = require('../models/user');
const {hashing,hashCompare,createJWT} = require('../auth');

mongoose.connect(dbUrl);

router.get('/:id',async(req,res)=>{
  
  try{
    const details = await UserDetails.findOne({_id:req.params.id})
    res.send({
      statusCode:200,
      user:details
    })
  }
  catch(error)
  {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
  }
})
router.post('/register',async(req,res)=>{
    try {
      const details = await UserDetails.findOne({email:req.body.email})
      if(details)
      {
        res.send({
          statusCode:400,
          message:"User already exists"
        })
      }
      else
      {
          //hashing the password and saving it in the db
          let hashedPassword = await hashing(req.body.password)
          req.body.password = hashedPassword;
          let doc = await UserDetails.create(req.body)
          res.send({
            statusCode:200,
            message:'Account Created'
          })
      }
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
    }

})

router.post('/login',async(req,res)=>{

  try{
    console.log(req)
    const details = await UserDetails.findOne({email:req.body.email})
   
    if(!details)
    {
      res.send({
        statusCode:400,
        message:"User Not found"
      })
    }
    else
    { 
      let role = details.role;
      let userID = details._id;
      //Compare the password entered by user and stored in the DB
      let compare = await hashCompare(req.body.password,details.password);
      if(compare==true)
      {
        //jwt token
        const token = await createJWT({email:req.body.email})
        res.send({
          statusCode:200,
          token,
          role,
          userID,
          message:'Login Successfull'
        })
      }
      else{
        res.send({
          statusCode:401,
          message:'Invalid Password'
        })
      }
    }
  }
  catch(error)
  {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server error"
    })
  }


})

router.put('/:id',async(req,res)=>{
  try{
    const details = await UserDetails.updateOne({_id:req.params.id},req.body)
    res.send({
      statusCode:200,
      details,
      message:"Changes Saved"
    })
  }
  catch(error)
  {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
  }
})


router.delete('/:id', async(req,res)=>{
  try {
    await UserDetails.deleteOne({_id:req.params.id})
    res.send({
      statusCode:200,
      message:"User Deleted"
    })
  } catch (error) {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
  }
})

module.exports = router;
