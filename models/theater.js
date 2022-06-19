const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

var theaterSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required:true
        },
        addressLine1:{
            type:String,
            required:true
        },
        addressLine2:{
            type:String,
            default:''
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            required:true,
            maxlength:6
        },
        country:{
            type:String,
            required:true
        },
        shows:{
            type:Array,
            default:[]
        },
        createdBy:{
            type:String,
            required:true
        },
    },
    {
        timestamps: true
    },
    {
        writeConcern: {
          j: true,
          wtimeout: 2000
        }
    }
)

const TheaterDetails = mongoose.model('theaters',theaterSchema);

module.exports={TheaterDetails};