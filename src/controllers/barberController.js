const User = require('../models/User');

// Crea un barbero vinculado a la barbería del admin autenticado
// Solo el admin puede crear barberos, no hay registro público para barberos
const createBarber = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar que el email no esté registrado en todo el sistema
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Asigna automáticamente la barbería del admin que crea el barbero
        const barber = await User.create({
            nombre,
            email,
            password,
            rol: 'barbero',
            barberia: req.user.barberia
        });

        if (barber) {
            res.status(201).json({
                _id: barber._id,
                nombre: barber.nombre,
                email: barber.email,
                rol: barber.rol,
                barberia: barber.barberia
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Lista solo los barberos de la barbería del admin autenticado
const getBarbers = async (req, res) => {
    try {
        const barbers = await User.find({
            rol: 'barbero',
            barberia: req.user.barberia
        }).select('-password')

        res.json(barbers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createBarber, getBarbers }
