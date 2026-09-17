const express = require('express');
const connectDB=require('./config/db')

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

const PORT = process.env.PORT || 3000;

connectDB()
app.get('/api/hello', (req, res) => {
    res.json({
        message: 'ClaimLite API is running'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});