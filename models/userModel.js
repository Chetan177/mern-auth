const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
    },
    role: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dli3zn9yn/image/upload/v1610216067/samples/people/smiling-man.jpg"
    },
},{timestamps: true});

module.exports = mongoose.model("Users", userSchema);
