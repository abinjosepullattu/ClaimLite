const express = require('express');
const connectDB=require('./config/db')

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const claimRoutes=require('./routes/claimRoutes')

app.use(express.json());
const errorHandler = require('./middleware/errorHandler');
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

app.use('/api/users', userRoutes);
app.use('/api/claims',claimRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});