//Schema y modelo del cliente
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        maxLength: 15,
    },
    email: {
        type: String,
        maxLength: 254,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
    },
    direccion: {
        type: String,
        trim: true,
    },
    notas: {
        type: String,
        trim: true,
    },
    barberia: {
        type: mongoose.Schema.ObjectId,
        ref: 'Barbershop',
    },
},
{timestamps: true});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client