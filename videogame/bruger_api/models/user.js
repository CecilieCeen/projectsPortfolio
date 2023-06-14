const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    userpic:{
        type:String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    try {
        const hashedpassword = await bcrypt.hash(this.password, 10)
        this.password = hashedpassword;
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('User', userSchema);