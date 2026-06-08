const estudianteSchema = require('../schemas/estudianteSchema')

const validarEstudianteZod = (req,res, next) => {
    const resultado = estudianteSchema.safeParse(req.body)

    if(!resultado.success){
        const errores = resultado.error.issues.map(
            error => error.message
        )
        return res.status(400).json({
            errores
        })
    }
    next()
}

module.exports = validarEstudianteZod