const mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            ref: 'users',
            required:true
        },
        film:{
            type:mongoose.Types.ObjectId,
            ref: 'films',
            required:true
        },
        theater:{
            type:mongoose.Types.ObjectId,
            ref: 'theaters',
            required:true
        },
        show:{
            type:mongoose.Types.ObjectId,
            ref: 'shows',
            required:true
        },
        bookedDate:{
            type:Date,
            required:true
        },
        seatsBooked:{
            type:Array,
            required:true
        },
        amountPaid:{
            type:Number,
            required:true
        },
        status:{
            type:String, 
            required:true
        },
        razorPayOrderId:{
            type:String, 
            required:true
        },
        razorPayPaymentId:{
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

const BookingDetails = mongoose.model('bookings',bookingSchema);

module.exports={BookingDetails};