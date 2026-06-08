const jwt = require ('jsonwebtoken')
const { decode } = require('../schemas/estudianteSchema')
const authMiddleware = (req,res,next) => {
    try{
        console.log(req.headers)
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                mensaje: 'Token requerido'
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.usuario = decoded
        
        next()
    }
    catch(error){
        return res.status(401).json({
            mensaje: ' Token invalido'
        })
    }
}

module.exports = authMiddleware