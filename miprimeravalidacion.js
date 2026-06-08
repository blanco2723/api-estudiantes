const validarEstudiante = (req, res, next) => {
    
    const {nombre, curso} = req.body

    if (!nombre || !curso){
        return res.status(400).json({
            mensaje: 'NOmbre y curso son obligatorios'
        })
    }

    if (typeof nombre !== 'string'){
        return res.status(400).json({
            mensaje: 'NOmbre debe ser texto'
        })
    }

    if (nombre.length < 3){
        return res.status(400).json({
            mensaje: 'Nombre debe tener al menos 3 caracteres'
        })
    }

    if(typeof curso !=='string'){
        return res.status(400).json({
            mensaje: ' Curso debe ser texto'
        })
    }


    next()
}
module.exports = validarEstudiante