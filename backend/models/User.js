const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Full name required'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: [true, 'Phone no required'],
        match: [/^\d{10}$/, 'Phone no must contain 10 digits']
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;