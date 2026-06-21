const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'User' },
    status: { type: String, default: 'Active' },
    phone: { type: String, default: '' },
    image: { type: String, default: 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;