const mongoose = require('mongoose');

var filmSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required:true
        },
        genre:{
            type:Array,
            required:true
        },
        cert:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            default:0
        },
        cast:{
            type:Array,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        addedBy:{
            type:String,
            required:true
        },
        addedAt:{
            type:Date,
            default:Date.now
        },
    },
    {
        writeConcern: {
          j: true,
          wtimeout: 2000
        }
    }
)

const FilmDetails = mongoose.model('films',filmSchema);

module.exports={FilmDetails};