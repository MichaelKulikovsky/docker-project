const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const connectDB = async () => {
    try {
        if (!process.env.DB_NAME) {
            throw new Error("DB_NAME is not defined in .env.local file!");
        }

        const uri = `mongodb://mongo:27017/${process.env.DB_NAME}`;
        await mongoose.connect(uri);
        console.log(`MongoDB connected successfully to: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;