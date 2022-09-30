var express = require("express");
var router = express.Router();
var { dbUrl } = require("../dbConfig");
const mongoose = require("mongoose");
const { ShowDetails } = require("../models/show");
var moment = require("moment");
const { authVerify } = require("../auth");

mongoose.connect(dbUrl);

//To get all the shows
router.get("/", authVerify, async (req, res) => {
  try {
    const details = await ShowDetails.find()
      .populate("film")
      .populate("theater")
      .populate("changedBy");
    res.send({
      statusCode: 200,
      shows: details,
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

//To get the show with its Id
router.get("/show/:id", authVerify, async (req, res) => {
  try {
    const details = await ShowDetails.findOne({ _id: req.params.id })
      .populate("film")
      .populate("theater")
      .populate("changedBy");
    res.send({
      statusCode: 200,
      show: details,
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

//To get the future shows for a movie with its Id
router.get("/:id", authVerify, async (req, res) => {
  let currentDate = new Date(Date.now()).toISOString();
  let year = +currentDate.substring(0, 4);
  let month = +currentDate.substring(5, 7);
  let date = +currentDate.substring(8, 10);
  console.log(currentDate, year, month, date);
  try {
    const details = await ShowDetails.find({
      film: req.params.id,
      date: { $gte: new Date(year, month - 1, date) },
    })
      .populate("film")
      .populate("theater")
      .populate("changedBy");
    if (details.length > 0) {
      let showsByTheater = {};
      details?.map((s) => {
        if (showsByTheater.hasOwnProperty(s.theater._id)) {
          showsByTheater[s.theater._id].push(s);
        } else {
          let sh = [];
          sh.push(s);
          showsByTheater[s.theater._id] = sh;
        }
      });
      res.send({
        statusCode: 200,
        shows: details,
        showsByTheater: showsByTheater,
      });
    } else {
      res.send({
        statusCode: 400,
        message: "No shows available",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//To create a new seating
router.post("/create-seating", authVerify, async (req, res) => {
  try {
    const details = await SeatingDetails.create(req.body);
    res.send({
      statusCode: 200,
      message: "seating Created",
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

//To create a new show
router.post("/create-show", authVerify, async (req, res) => {
  try {
    let date = `${req.body.date}T00:00:00.000+00:00`;
    let showExists = false;
    let nst = moment(`1970-01-01T${req.body.startTime}`);
    let net = moment(`1970-01-01T${req.body.endTime}`);
    const detail = await ShowDetails.find({
      film: req.body.film,
      theater: req.body.theater,
      date: date,
    });
    if (detail.length > 0) {
      detail.map((s) => {
        let ost = moment(`1970-01-01T${s.startTime}`);
        let oet = moment(`1970-01-01T${s.endTime}`);
        if (
          moment(nst).isBetween(ost, oet) ||
          moment(net).isBetween(ost, oet) ||
          moment(nst).isSame(ost) ||
          moment(net).isSame(oet) ||
          (moment(nst).isBefore(ost) && moment(net).isAfter(oet))
        ) {
          showExists = true;
        }
      });
    }
    if (showExists) {
      res.send({
        statusCode: 400,
        message:
          "Overlap between the show timings, please modify the show timing and try again",
      });
    } else {
      const details = await ShowDetails.create(req.body);
      res.send({
        statusCode: 200,
        message: "Show Created",
        details,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
});

//To update the show with id
router.put("/:id", authVerify, async (req, res) => {
  try {
    const details = await ShowDetails.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.send({
      statusCode: 200,
      message: "Changes Saved for the show",
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

//To delete the show with id
router.delete("/:id", authVerify, async (req, res) => {
  try {
    await ShowDetails.deleteOne({ _id: req.params.id });
    res.send({
      statusCode: 200,
      message: "Show has been Deleted",
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
