const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        max:40,
        min:1
    },
    password:{
        type : String,
        required : true
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

module.exports = mongoose.model('User', userSchema)