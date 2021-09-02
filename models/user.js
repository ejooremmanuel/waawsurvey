const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    userid: String
})

const User = mongoose.model('User', userSchema);


module.exports = User;