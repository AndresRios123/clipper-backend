const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const genereateToken = require('../utils/generateToken');

const register = async (req, res) => {
    try {
        //PASO 1: sacar los datos que envió el cliente del body
        const {nombre, email, password, rol} = req.body;

        //PASO 2: verificar si ya existe un usuario con ese email
        const userExist = User.findOne({email});

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