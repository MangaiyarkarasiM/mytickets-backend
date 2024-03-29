const mongoose = require('mongoose');
const { Schema } = mongoose;

var showSchema = new mongoose.Schema(
    {
        film:{
            type:Schema.Types.ObjectId,
            ref: 'films',
            required:true
        },
        theater:{
            type:Schema.Types.ObjectId,
            ref: 'theaters',
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
        changedBy:{
            type:Schema.Types.ObjectId,
            ref: 'users',
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