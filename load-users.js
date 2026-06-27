require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const User = require('./model/User.js');

const users = [
  { name: "Roi Ben-Ami", email: "roi.ba@gmail.com", role: "Cloud Engineer", status: "Active", phone: "0547788990", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F4ac5f72f3c24f237f0f7e6d7f767d19e.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Shir Cohen", email: "shir.cohen@tech.com", role: "Data Analyst", status: "Active", phone: "0501234567", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F8d3de659bfe593c5a4ef0376bd3d2c07.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Yossi Levy", email: "yossi.l@mail.com", role: "Network Admin", status: "Active", phone: "0525544332", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F45ef7efa5f718ccd1cde4e2b934e8607.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "David Cohen", email: "d.cohen@outlook.com", role: "Backend Developer", status: "Active", phone: "0549988776", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F321f5bcb6efc56013d67ae101f196eaf.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Maya Tal", email: "mtal@company.com", role: "UI/UX Designer", status: "Active", phone: "0505554433", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2Fd1499909450ba526d5297e3ebc7f6d07.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Omer Ben-David", email: "omer.bd@gmail.com", role: "QA Engineer", status: "Inactive", phone: "0587766554", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2Fbb8c76bcb73cf00e7d4ab920447a365c.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Noa Shaked", email: "noash@mail.com", role: "Product Manager", status: "Active", phone: "0523344556", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F644dfc35027924a6e5dfbcad653be697.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Idan Raz", email: "idan.raz@tech.com", role: "Data Scientist", status: "Active", phone: "0541231234", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F8654c911c90383bb42a6cdddd66014c5.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Dana Katz", email: "dkatz@gmail.com", role: "System Architect", status: "Pending", phone: "0509988112", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2Fb89db8099e05245d0f3e19be6beeafca.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Guy Levi", email: "guyl@mail.com", role: "Security Analyst", status: "Inactive", phone: "0536677889", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F7ae3a0ffcf9eb41156244fbaa3588de7.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" },
  { name: "Talia Gold", email: "talia.g@gmail.com", role: "HR Manager", status: "Pending", phone: "0529900112", image: "https://tabler.io/_next/image?url=%2Favatars%2Ftransparent%2F2d81c3469090a90daff20560a129b182.png&w=280&q=85&dpl=dpl_S4vYriuA9bsyL8zjWtFAamemB9fV" }
];

async function insertUsers() {
    try {
        // שימוש במשתנה הסביבה של הענן (MONGO_URI), ואם לא קיים - יחזור לשרת המקומי כגיבוי
        const uri = process.env.MONGO_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`;
        
        await mongoose.connect(uri);
        console.log(`MongoDB connected successfully.`);

        await User.deleteMany({});
        await User.insertMany(users);
        console.log("Users loaded into the DB successfully with all fields!");
    } catch (error) {
        console.error("Something went wrong:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("Closed connection");
    }
}

insertUsers();