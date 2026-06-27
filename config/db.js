const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const connectDB = async () => {
    try {
        // חיבור ישיר למשתנה הסביבה בענן, ללא תלות בקובץ המקומי בשרת מרוחק
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }

        await mongoose.connect(uri);
        console.log(`MongoDB connected successfully to cloud.`);
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;







