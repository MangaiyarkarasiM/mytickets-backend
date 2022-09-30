var express = require("express");
var router = express.Router();
var { dbUrl } = require("../dbConfig");
const mongoose = require("mongoose");
const { FilmDetails } = require("../models/film");
const { authVerify } = require("../auth");

mongoose.connect(dbUrl);

//To get all the movies
router.get("/", authVerify, async (req, res) => {
  try {
    const details = await FilmDetails.find().populate("changedBy");
    res.send({
      statusCode: 200,
      movies: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//To get a movie with movie Id
router.get("/:id", authVerify, async (req, res) => {
  try {
    const details = await FilmDetails.findOne({ _id: req.params.id }).populate(
      "changedBy"
    );
    res.send({
      statusCode: 200,
      movie: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//To create a new movie
router.post("/create-film", authVerify, async (req, res) => {
  try {
    const details = await FilmDetails.create(req.body);
    res.send({
      statusCode: 200,
      message: "Movie Created",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

////To update a movie with Id
router.put("/:id", authVerify, async (req, res) => {
  try {
    const details = await FilmDetails.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.send({
      statusCode: 200,
      message: "Changes Saved for the movie",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

////To delete a movie with Id
router.delete("/:id", authVerify, async (req, res) => {
  try {
    await FilmDetails.deleteOne({ _id: req.params.id });
    res.send({
      statusCode: 200,
      message: "Movie has been Deleted",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

module.exports = router;
