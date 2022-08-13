const mongoose = require('mongoose');
const { Schema } = mongoose;

var filmSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true
        },
        about:{
            type:String, 
            required:true
        },
        posterUrl:{
            type:String, 
            required:true
        },
        bannerUrl:{
            type:String, 
            required:true
        },
        languages:{
            type:Array,
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
        ticketPrice:{
            type:Number,
            required:true
        },
        releaseDate:{
            type:Date,
            required:true
        },
        changedBy:{
            type:Schema.Types.ObjectId,
            ref:'users',
            required:true
        }
    },
    {
        timestamps:true
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