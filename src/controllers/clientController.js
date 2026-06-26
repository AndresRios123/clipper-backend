const Client = require('../models/Client');

// Crea un cliente vinculado a la barbería del usuario autenticado
const createClient = async (req, res) => {
    try {
        const {nombre, telefono, email, direccion, notas} = req.body;

        if (email) {
            // Verificar que el email no exista en la misma barbería
            const clientExist = await Client.findOne({ email, barberia: req.user.barberia });
    
            if (clientExist) {
                return res.status(400).json({message: 'El email ingresado ya se encuentra registrado en esta barbería'});
            }             
        }

        // Asigna automáticamente la barbería del usuario que crea el cliente
        const cliente = await Client.create({
            nombre,
            telefono,
            email,
            direccion,
            notas,
            barberia: req.user.barberia
        });

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

// Lista solo los clientes de la barbería del usuario autenticado
const getClients = async (req, res) => {
    try {
        const clients = await Client.find({ barberia: req.user.barberia })
        return res.json({clients})
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// Obtiene un cliente solo si pertenece a la barbería del usuario
const getClientById = async (req, res) => {
    try {
        const client = await Client.findOne({ _id: req.params.id, barberia: req.user.barberia });
        if(!client){
            return res.status(400).json({message: 'Cliente no encontrado'});
        }

        return res.json(client)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

// Actualiza un cliente solo si pertenece a la barbería del usuario
const updateClient = async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, barberia: req.user.barberia },
            req.body,
            {new: true, runValidators: true}
        )

        if(!client){
            return res.status(404).json({message: 'Cliente no encontrado'});
        }

        return res.json(client);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Elimina un cliente solo si pertenece a la barbería del usuario
const deleteClient = async (req, res) => {
    try {
        const cliente = await Client.findOneAndDelete({ _id: req.params.id, barberia: req.user.barberia });
        if(!cliente){
            return res.status(404).json({message: 'Cliente no encontrado'});
        }

        return res.json({message: 'El cliente ha sido eliminado correctamente'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {createClient, getClients, getClientById, updateClient, deleteClient};