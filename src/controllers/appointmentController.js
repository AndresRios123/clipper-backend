const Appointment = require('../models/Appointment');
const Client = require('../models/Client');
const User = require('../models/User');

const createAppointment = async (req, res) => {
    try {
        // 1. Extraer campos del body
        const { cliente, barbero, fecha, servicio, precio, duracion, estado, notas } = req.body;

        // 2. Validar campos obligatorios
        if (!cliente || !barbero || !fecha || !servicio || !precio || !duracion) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: cliente, barbero, fecha, servicio, precio, duracion' });
        }

        // 3. Validar que el cliente exista y pertenezca a la misma barbería
        const clientExists = await Client.findOne({ _id: cliente, barberia: req.user.barberia });
        if (!clientExists) {
            return res.status(400).json({ message: 'Cliente no encontrado en esta barbería' });
        }

        // 4. Validar que el barbero exista, tenga rol 'barbero' y pertenezca a la misma barbería
        const barberExists = await User.findOne({ _id: barbero, rol: 'barbero', barberia: req.user.barberia });
        if (!barberExists) {
            return res.status(400).json({ message: 'Barbero no encontrado en esta barbería' });
        }

        // 5. Validar que la fecha no sea pasada
        if (new Date(fecha) < new Date()) {
            return res.status(400).json({ message: 'La fecha de la cita no puede ser en el pasado' });
        }

        // 6. Validar que el barbero no tenga otra cita en el mismo horario
        //    Calculamos el inicio y fin de la nueva cita para detectar superposición
        const nuevaFecha = new Date(fecha);
        const nuevaFin = new Date(nuevaFecha.getTime() + duracion * 60000); // duracion en minutos

        const citaExistente = await Appointment.findOne({
            barbero,
            barberia: req.user.barberia,
            estado: { $ne: 'cancelada' }, // ignorar citas canceladas
            $or: [
                // La cita existente empieza dentro del rango de la nueva
                { fecha: { $gte: nuevaFecha, $lt: nuevaFin } },
                // La cita existente termina dentro del rango de la nueva
                // (fecha + duracion > nuevaFecha)
                {
                    $expr: {
                        $and: [
                            { $lt: ['$fecha', nuevaFecha] },
                            {
                                $gt: [
                                    { $add: ['$fecha', { $multiply: ['$duracion', 60000] }] },
                                    nuevaFecha
                                ]
                            }
                        ]
                    }
                }
            ]
        });

        if (citaExistente) {
            return res.status(400).json({ message: 'El barbero ya tiene una cita agendada en ese horario' });
        }

        // 7. Crear la cita
        const appointment = await Appointment.create({
            cliente,
            barbero,
            barberia: req.user.barberia,
            fecha,
            servicio,
            precio,
            duracion,
            estado: estado || 'pendiente',
            notas
        });

        if (appointment) {
            // Poblar referencias para devolver datos completos
            const populated = await Appointment.findById(appointment._id)
                .populate('cliente', 'nombre telefono')
                .populate('barbero', 'nombre email');

            return res.status(201).json(populated);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({barberia: req.user.barberia})
            .populate('cliente', 'nombre telefono')
            .populate('barbero', 'nombre email');
        return res.json({appointments})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }

}

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findOne({_id: req.params.id, barberia: req.user.barberia})
        if(!appointment){
            return res.status(404).json({message: "Cita no encontrada"});
        }

        return res.json({appointment});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findOneAndUpdate(
            { _id: req.params.id, barberia: req.user.barberia },
            req.body,
            { new: true, runValidators: true }
        )
        .populate('cliente', 'nombre telefono')
        .populate('barbero', 'nombre email');

        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        return res.json(appointment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findOneAndDelete(
            { _id: req.params.id, barberia: req.user.barberia }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        return res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment };
