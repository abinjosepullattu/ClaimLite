const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {

    if (error.code === 11000) {
        return res.status(409).json({
            message: 'Email already exists'
        });
    }

    res.status(400).json({
        message: error.message
    });
}
};

const getUser = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createUser,getUser
};