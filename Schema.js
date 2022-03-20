const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            default:'user'
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            default:"000-000000"
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    {
        writeConcern: {
          j: true,
          wtimeout: 2000
        }
    }
)
const UserDetails = mongoose.model('users',userSchema);

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
        createdAt:{
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

const TheaterDetails = mongoose.model('theaters',theaterSchema);

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

var showSchema = new mongoose.Schema(
    {
        filmID:{
            type:ObjectId, 
            required:true
        },
        theaterID:{
            type:ObjectId, 
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        startTime:{
            type:String,
            required:true
        },
        endTime:{
            type:String,
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

const ShowDetails = mongoose.model('shows',showSchema);

module.exports={UserDetails,TheaterDetails,FilmDetails,ShowDetails};