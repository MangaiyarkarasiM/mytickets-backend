const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            default:'user'
        },
        lastName:{
            type:String,
            default:''
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
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
            default:''
        },
        dob:{
            type:Date,
            default:''
        },
        gender:{
            type:String,
            default:''
        },
        addressLine1:{
            type:String,
            default:''
        },
        addressLine2:{
            type:String,
            default:''
        },
        city:{
            type:String,
            default:''
        },
        state:{
            type:String,
            default:''
        },
        pincode:{
            type:Number,
            maxlength:6,
            default:0
        },
        profile:{
            type:Buffer
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
const UserDetails = mongoose.model('users',userSchema);

module.exports={UserDetails};