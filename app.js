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
// אפשר גישה מכל מקור (מתאים גם לפיתוח מקומי וגם לענן)
app.use(cors());

// הגדרת התיקייה הנוכחית להגשת קבצים סטטיים (כמו index.html ו-style.css)
app.use(express.static(__dirname));

// מסלול ראשי - יציג כעת את קובץ ה-index.html שלך
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// ניתוב הבקשות לראוטר המשתמשים
app.use("/api/users", usersRoutes);

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});

