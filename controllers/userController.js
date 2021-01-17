const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');

const {CLIENT_URL} = process.env.CLIENT_URL

const userController = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({msg: 'Please fill all fields'});
            }
            if (!validateEmail(email))
                return res.status(400).json({msg: 'Please enter correct email'})

            const user = await Users.findOne({email: email})
            if (user) return res.status(400).json({msg: 'This email is already registered'})

            if (password.length < 6)
                return res.status(400).json({msg: 'Password must greater tha 6 charaters'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activate/${{activation_token}}`
            sendMail(email, url)

            console.log(activation_token)

            return res.status(200).json({msg: 'Register successful! please activate your email'});

        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.msg});
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expireIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expireIn: '15m'})
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.RFERESH_TOKEN_SECRET, {expireIn: '7d'})
}

module.exports = userController;