const express = require('express');
const connectDB = require("./config/db"); 
const app = express();
const cors = require('cors');
const port = 3000; 
const usersRoutes = require("./routes/users");

// חיבור למסד הנתונים
connectDB();

// הגדרת לקבלת נתונים בפורמט ואיפשור תקשורת
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

// מסלול ראשי
app.get("/", (req, res) => {
    res.send('Welcome to our user management app.');
});

// ניתוב הבקשות לראוטר המשתמשים
app.use("/api/users", usersRoutes);

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});


