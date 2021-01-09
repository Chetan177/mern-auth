const Users = require('../models/userModel');

const userController = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;
            if (!name || !email || !password) {
                return res.Status(400).json({msg: 'Please fill all fields'});
            }

            return res.status(200).json({msg: 'Register Test'});
        } catch (err) {
            return res.status(500).json({msg: err.msg});
        }
    }
}

module.exports = userController;