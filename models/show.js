const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

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

const ShowDetails = mongoose.model('shows',showSchema);

module.exports={ShowDetails};