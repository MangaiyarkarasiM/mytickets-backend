const mongoose = require('mongoose');
const { Schema } = mongoose;

var SeatingSchema = new mongoose.Schema(
    {
        show:{
            type:Schema.Types.ObjectId,
            ref: 'shows',
            unique:true,
            required:true
        },
        seatsBooked:{
            type:Array,
            default:[]
        }
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

const SeatingDetails = mongoose.model('seatings',SeatingSchema);

module.exports={SeatingDetails};