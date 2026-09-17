const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongodb connected succesfully')

    }catch(err){
        console.log('connection error')
        console.log(err.message)

    }
}
module.exports = connectDB