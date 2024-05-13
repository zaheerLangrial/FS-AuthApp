import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    }
}, {timeStemps : true});

const User = mongoose.model('User' , userSchema)

export default User