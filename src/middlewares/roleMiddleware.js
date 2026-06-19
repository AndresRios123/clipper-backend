// Recibe los roles permitidos y devuelve un middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.rol)){
            next();
        }else{
            res.status(403).json({message: 'Acceso denegado. No tienes permisos'});
        }
    }
}

module.exports = {authorize};