var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {ShowDetails} = require('../models/show');

mongoose.connect(dbUrl);

router.get('/',async(req,res)=>{
  
    try{
      const details = await ShowDetails.find()
      res.send({
        statusCode:200,
        shows:details
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

  router.get('/:id',async(req,res)=>{
  
    try{
      const details = await ShowDetails.find({filmID:req.params.id});
      if(details.length>0)
      {
        res.send({
            statusCode:200,
            shows:details
          })
      }
      else{
        res.send({
            statusCode:400,
            message:"No shows available"
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

  router.post('/create-show',async(req,res)=>{
    try {

      const details = await ShowDetails.create(req.body)
      res.send({
        statusCode:200,
        message:"Show Created"
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
    const details = await ShowDetails.updateOne({_id:req.params.id},req.body)
    res.send({
      statusCode:200,
      message:"Changes Saved for the show"
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
    await ShowDetails.deleteOne({_id:req.params.id})
    res.send({
      statusCode:200,
      message:"Show has been Deleted"
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