// Modelo para barberías
const mongoose = require('mongoose')

const barberShopSchema = new mongoose.Schema({
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

const Barbershop = mongoose.model('Barbery', barberShopSchema);

module.exports = Barbershop