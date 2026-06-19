const Client = require('../models/Client');

const register = async (req, res) => {
    try {
        const {nombre, telefono, email, direccion, notas} = req.body;

        if (email) {
            const clientExist = await Client.findOne({email});
    
            if (clientExist) {
                return res.status(400).json({message: 'El email ingresado ya se encuentra registrado'});
            }             
        }

        const cliente = await Client.create({nombre, telefono, email, direccion, notas});

        if(cliente){
            return res.status(201).json({
                _id: cliente._id,
                nombre: cliente.nombre,
                telefono: cliente.telefono,
                email: cliente.email,
                direccion: cliente.direccion,
                notas: cliente.notas,
            })
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Client.find({})
        return res.json({clients})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {register};