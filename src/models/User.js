//Schema y modelo del usuario
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    rol: {
        type: String,
        enum: ['admin', 'barbero'],
        default: 'barbero'
    },
    activo: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;