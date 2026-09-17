const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Claim must be associated with user']
    },

    claimType: {
        type: String,
        required: [true, 'Claim type is required'],
        enum: ['Auto','Home','Health']
    },

    amount: {
        type: Number,
        required: [true, 'Claim amount is required'],
        min: [0.01, 'Claim amount must be greater than 0'],
        max: [1000000, 'Claim amount cannot exceed 1000000']
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: 10,
        maxlength: 500
    }

}, { timestamps: true });

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;