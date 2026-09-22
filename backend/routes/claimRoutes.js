const {addClaim,getClaims}=require('../controllers/claimController')

const express=require('express')
const router=express.Router()

router.post('/', addClaim)
router.get('/',getClaims)
module.exports=router