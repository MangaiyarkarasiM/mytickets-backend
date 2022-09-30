var express = require("express");
var router = express.Router();
var { dbUrl } = require("../dbConfig");
const mongoose = require("mongoose");
const { TheaterDetails } = require("../models/theater");
const { authVerify } = require("../auth");

mongoose.connect(dbUrl);

router.get("/", authVerify, async (req, res) => {
  try {
    const details = await TheaterDetails.find();
    res.send({
      statusCode: 200,
      theaters: details,
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

router.post("/create-theater", authVerify, async (req, res) => {
  try {
    const details = await TheaterDetails.create(req.body);
    res.send({
      statusCode: 200,
      message: "Theater Created",
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

router.put("/:id", authVerify, async (req, res) => {
  try {
    const details = await TheaterDetails.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.send({
      statusCode: 200,
      message: "Changes Saved for the theater",
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

router.delete("/:id", authVerify, async (req, res) => {
  try {
    await TheaterDetails.deleteOne({ _id: req.params.id });
    res.send({
      statusCode: 200,
      message: "Theater has been Deleted",
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
