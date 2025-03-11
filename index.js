require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/userRoute.js');
const authRoute = require('./routes/authRoute.js');
const blogRoute = require('./routes/blogRoute.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/blog', blogRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB...'))
    .catch(err => console.error('❌ Could not connect to MongoDB...', err));

const port = process.env.PORT;
app.listen(port, () => console.log(`🚀 Server running on port ${port}...`));