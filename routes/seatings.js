var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {SeatingDetails} = require('../models/seating');

mongoose.connect(dbUrl);

//To get all the seatings
router.get('/',async(req,res)=>{
  
    try{
      const details = await SeatingDetails.find().populate('show');
      res.send({
        statusCode:200,
        seatings:details
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

  //To get the seatings for a show with its Id
  router.get('/:id',async(req,res)=>{

    try{
      const details = await SeatingDetails.findOne({show:req.params.id}).populate('show');
         res.send({
            statusCode:200,
            seatings:details,
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

  //To create a new seating
  router.post('/create-seating',async(req,res)=>{
    try {

      const details = await SeatingDetails.create(req.body)
      res.send({
        statusCode:200,
        message:"seating Created"
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

//To update the seating with id
router.put('/:id',async(req,res)=>{
  try{
    const details = await SeatingDetails.updateOne({_id:req.params.id},req.body)
    res.send({
      statusCode:200,
      message:"Changes Saved for the seating"
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

//To delete the seating with id
router.delete('/:id', async(req,res)=>{
  try {
    await SeatingDetails.deleteOne({_id:req.params.id})
    res.send({
      statusCode:200,
      message:"seating has been Deleted"
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