var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {FilmDetails} = require('../models/film');

mongoose.connect(dbUrl);

router.get('/',async(req,res)=>{
  
    try{
      const details = await FilmDetails.find()
      res.send({
        statusCode:200,
        movies:details
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

  router.post('/create-film',async(req,res)=>{
    try {

      const details = await FilmDetails.create(req.body)
      res.send({
        statusCode:200,
        message:"Movie Created"
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
    const details = await FilmDetails.updateOne({_id:req.params.id},req.body)
    res.send({
      statusCode:200,
      message:"Changes Saved for the movie"
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
    await FilmDetails.deleteOne({_id:req.params.id})
    res.send({
      statusCode:200,
      message:"Movie has been Deleted"
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