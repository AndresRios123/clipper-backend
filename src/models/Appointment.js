const mongoose = require('mongoose');

const appointmentScheema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.ObjectId,
        ref:'Client',
    },
    barbero: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    barberia:{
        type: mongoose.Schema.ObjectId,
        ref: 'Barbershop'
    },
    fecha: {
        type: Date,
        required: true,
    },
    servicio: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    notas: {
        type: String,
    },
},{
    timestamps: true,
})

const Appointment = mongoose.model('Appointment', appointmentScheema);

module.exports = Appointment;