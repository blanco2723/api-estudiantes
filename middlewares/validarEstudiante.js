const validarEstudiante = (req, res, next) => {
    
    const {nombre, curso} = req.body
    const errores = []

    if(!nombre){
        errores.push('Nombre es obligatorio')
    }
    if(!curso){
        errores.push('Curso es obligatorio')
    }
    if(curso && typeof curso !== 'string'){
        errores.push('Curso debe ser texto')
    }
      if(typeof nombre === 'string' && nombre.length <3){
        errores.push('Nombre debe tener almenos 3 caracteres')
    }
    if(errores.length > 0){
        return res.status(400).json({
            errores
        })
    }
    
    next()
}
module.exports = validarEstudiante