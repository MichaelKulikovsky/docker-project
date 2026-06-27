const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const connectDB = async () => {
    try {
        // אם קיים משתנה סביבה MONGO_URI בענן, נתחבר אליו. אחרת, ל-Docker המקומי
        const uri = process.env.MONGO_URI || `mongodb://mongo:27017/${process.env.DB_NAME}`;
        
        await mongoose.connect(uri);
        console.log(`MongoDB connected successfully.`);
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;







// mongodb+srv://michaelkulikovsky_db_user:<db_password>@cluster0.ngvh0sg.mongodb.net/?appName=Cluster0