const API_URL = 'http://localhost:3000/api/users';

//  שליפת כל המשתמשים וטעינתם לטבלה
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        const tableBody = document.querySelector('.users-table tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
// עדכון כמות המשתמשים בראש העמוד 
        const totalUsersEl = document.getElementById('totalUsers');
        if (totalUsersEl) {
            totalUsersEl.innerText = users.length;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
// התאמת צבע התגית לפי הסטטוס 
            let statusBadgeClass = 'badge-active';
            if (user.status && user.status.toLowerCase() === 'inactive') statusBadgeClass = 'badge-inactive';
            if (user.status && user.status.toLowerCase() === 'pending') statusBadgeClass = 'badge-pending';

            row.innerHTML = `
                <td class="checkbox-col"><input type="checkbox" class="custom-checkbox"></td>
                <td>
                    <div class="user-cell">
                        <img src="${user.image || 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'}" alt="Avatar">
                        <div class="user-info">
                            <span class="User-Name">${user.name}</span>
                            <span class="User-Email">${user.email}</span>
                        </div>
                    </div>
                </td>
                <td>${user.role || 'User'}</td>
                <td><span class="badge ${statusBadgeClass}">${user.status || 'Active'}</span></td>
                <td>${user.phone || ''}</td>
                <td>
                    <div class="action-button">
                        <button class="icon-btn" onclick="editUserPrompt('${user._id}')">
                            <span class="Edit-span" style="color: #000000; font-weight: bold; margin-right: 10px;">Edit</span>
                        </button>
                        <button class="icon-btn" onclick="deleteUser('${user._id}')">
                            <span class="Delete-span" style="color: #dc3545; font-weight: bold;">Delete</span>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// מחיקת משתמש לפי  (_id)
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
// רענון הטבלה לאחר המחיקה
        if (response.ok) {
            loadUsers();
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// עריכת משתמש קיים (Edit)
async function editUserPrompt(id) {
// שליפת הנתונים הקיימים של המשתמש    
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("User not found");
        const user = await res.json();

        const name = prompt(" Add User Name :", user.name);
        if (!name) return;
        const role = prompt(" Add Role :", user.role);
        if (!role) return;
        const email = prompt(" Add Email", user.email);
        if (!email) return;
        const status = prompt(" Add Status (Active / Inactive / Pending):", user.status);
        if (!status) return;
        const phone = prompt(" Add phone Number :", user.phone);
        if (!phone) return;

// שליחת בקשת עדכון
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // או PATCH לפי מה שהגדרת בראוטר שלך
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, role, status, phone, image: user.image })
        });
// רענון הטבלה לאחר העדכון
        if (response.ok) {
            loadUsers(); 
        } else {
            const err = await response.json();
            alert('שגיאה בעדכון משתמש: ' + (err.message || JSON.stringify(err)));
        }
    } catch (error) {
        console.error('Error fetching/updating user:', error);
    }
}

//  הוספת משתמש חדש
async function addNewUserPrompt() {
    const name = prompt("Enter Full Name:");
    if (!name) return;
    const role = prompt("Enter Role:");
    if (!role) return;
    const email = prompt("Enter Email:");
    if (!email) return;
    const status = prompt("Enter Status (Active / Inactive / Pending):");
    if (!status) return;
    const phone = prompt("Enter Phone Number:");
    if (!phone) return;
// כתובת תמונה כברירת מחדל 
    const image = "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, role, status, phone, image })
        });
// רענון הטבלה עם המשתמש החדש
        if (response.ok) {
            loadUsers();
        } else {
            const err = await response.json();
            alert('שגיאה בהוספת משתמש: ' + (err.message || JSON.stringify(err)));
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// מאזין לטעינת העמוד
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
// חיבור כפתור הוספת משתמש לפונקציה   
    const addUserBtn = document.querySelector('.dashboard-header .btn-primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addNewUserPrompt);
    }
});



