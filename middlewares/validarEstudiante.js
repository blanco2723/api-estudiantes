const validarEstudiante = (req, res, next) => {
    const {nombre, curso} = req.body

    if (!nombre || !curso){
        return res.status(400).json({
            mensaje: 'NOmbre y curso son obligatorios'
        })
    }
    next()
}
module.exports = validarEstudiante