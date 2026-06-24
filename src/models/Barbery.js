// Modelo para barberías
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const barberySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true,
        unique: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
    },
    duenio: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
},
{timestamps: true});

const Barbery = mongoose.model('Barbery', barberySchema);

module.exports = Barbery