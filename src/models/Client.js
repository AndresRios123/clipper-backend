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
    },
    direccion: {
        type: String,
    },
    notas: {
        type: String,
    },
},
{timestamps: true});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client