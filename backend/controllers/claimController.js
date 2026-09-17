const Claim=require('../models/Claim')
const User = require('../models/User');
const addClaim= async (req,res)=>{
    try{
          const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const claim=await Claim.create(req.body)
        res.status(201).json(claim)
    }catch (err) {

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid user ID'
        });
    }

    res.status(400).json({
        message: err.message
    });
}
}
const getClaims = async (req, res) => {
    try {
        const claims = await Claim.find()
            .populate('userId', 'fullName email');

        res.status(200).json(claims);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
module.exports={addClaim,getClaims}