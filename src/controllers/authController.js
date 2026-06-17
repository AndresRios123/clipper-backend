// Un controlador es una función que Express ejecuta cuando alguien visita una ruta

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
    try {
        //PASO 1: sacar los datos que envió el cliente del body
        const {nombre, email, password, rol} = req.body;

        //PASO 2: verificar si ya existe un usuario con ese email
        const userExist = await User.findOne({email});

        //PASO 3: Si existe respondemos con error 400
        if(userExist){
            return res.status(400).json({message: 'El email ingresado ya se encuentra registrado'});
        }

        //PASO 4: si no existe creamos el usuario
        const user = await User.create({nombre, email, password, rol});

        //PASO 5: Si se creó correctamente, respondemos 201 con los datos y el token
        if(user){
            res.status(201).json({
                _id:user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const login = async (req, res) => {
    try{
        //Paso 1: sacar email y password del body
        const {email, password} = req.body;

        //PASO 2: buscar el usuario por email
        const user = await User.findOne({email});

        // Paso 3: si el usuario existe y la contraseña coincide
        if(user && await (user.comparePassword(password))){
            return res.status(200).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                token: generateToken(user.id)
            })
        }else{
            return res.status(401).json({message: 'Email o contraseña incorrectos'});
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {register, login}