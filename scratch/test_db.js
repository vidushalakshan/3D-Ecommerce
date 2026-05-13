
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../frontend/.env.local') });

const MONGODB_URI = process.env.MONGODB_URL;

async function testConnection() {
    console.log('Attempting to connect to:', MONGODB_URI);
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 
        });
        console.log('Successfully connected to MongoDB!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Connection error:', err);
    }
}

testConnection();