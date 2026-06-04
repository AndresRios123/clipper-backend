//Función que crea el admin por defecto si no existe
const mongoose = require('mongoose');
const User = require('../models/User');


const seedAdmin = async () => {
    const userFounded = await User.findOne({rol: 'admin'});

    if(userFounded){
        return userFounded;
    }else{
        const user = new User({
            nombre: 'admin',
            email: 'admin@mail.com',
            password: 'admin123',
            rol: 'admin',
            activo: true,
        })

        await user.save();

        return user;
    }
}

module.exports = seedAdmin;