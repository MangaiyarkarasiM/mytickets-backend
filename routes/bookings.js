var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {BookingDetails} = require('../models/booking');

mongoose.connect(dbUrl);

//To get all the bookings
router.get('/',async(req,res)=>{
  
    try{
      const details = await BookingDetails.find().populate('user').populate('film').populate('theater').populate('show');
      res.send({
        statusCode:200,
        bookings:details
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

//To get the bookings for a user with user Id
router.get('/user/:id',async(req,res)=>{
  
  try{
    const details = await BookingDetails.find({user:req.params.id}).populate('user').populate('film').populate('theater').populate('show');
    if(details.length>0)
    {
      res.send({
          statusCode:200,
          bookings:details
        })
    }
    else{
      res.send({
          statusCode:400,
          message:"No bookings available"
        })
    }
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

//To get the bookings for a movie with movie Id
router.get('/film/:id',async(req,res)=>{
  
  try{
    const details = await BookingDetails.find({film:req.params.id}).populate('user').populate('film').populate('theater').populate('show');
    if(details.length>0)
    {
      res.send({
          statusCode:200,
          bookings:details
        })
    }
    else{
      res.send({
          statusCode:400,
          message:"No bookings available"
        })
    }
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

//To get the bookings for a theater with theater Id
router.get('/theater/:id',async(req,res)=>{
  
  try{
    const details = await BookingDetails.find({theater:req.params.id}).populate('user').populate('film').populate('theater').populate('show');
    if(details.length>0)
    {
      res.send({
          statusCode:200,
          bookings:details
        })
    }
    else{
      res.send({
          statusCode:400,
          message:"No bookings available"
        })
    }
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

router.post('/create-booking',async(req,res)=>{
  try {
    const details = await BookingDetails.create(req.body)
    res.send({
      statusCode:200,
      message:"Booking Created",
      booking:details
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

router.put('/:id',async(req,res)=>{
  try{
    const details = await BookingDetails.updateOne({_id:req.params.id},req.body)
    res.send({
      statusCode:200,
      message:"Changes Saved for the booking"
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
    await BookingDetails.deleteOne({_id:req.params.id})
    res.send({
      statusCode:200,
      message:"Booking has been Deleted"
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