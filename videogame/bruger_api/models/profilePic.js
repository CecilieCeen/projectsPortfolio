const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    userPic:{
        type:String,
        required: true
    },
    id:{
        type:Number,
        required: true
    }

})

module.exports = mongoose.model('Profilepics', Schema, 'profilepics');