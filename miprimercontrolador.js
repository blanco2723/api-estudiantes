//obtener todos los estudiantes
const obtenerEstudiantes = (req,res) => {
    res.json(estudiantes)
}

//obtener por ID
const obtenerEstudianteporId = (req,res) => {
    const id = parseInt(req.params.id)
    const estudiante = estudiantes.find(est => est.id === id)

    if(!estudiante){
        return res.status(404).json({
            mensaje: 'Estudiante no esncontrado'
        })
    }
    res.json(estudiante)
}

//Crear nuevo estudiante 
const crearEstudiante = (req,res) => {
    const nuevoEstudiante = req.body 
    estudiantes.push(nuevoEstudiante)
    
    res.json({
        mensaje: 'Estudiante agregado correctamente',
        estudiante: nuevoEstudiante
    })
}

//Actualizar estudiante 
const actualizarEstudiante = (req, res) => {
    const id = parseInt(req.params.id)
    const estudiante = estudiantes.find(est => est.id === id)

    if(!estudiante){
        return res.status(404).json({
            mensaje: 'Estudiante no encontrado'
        })
    }
    estudiante.nombre = req.body.nombre
    estudiante.curso = req.body.curso

    res.json({
        mensaje:'estudiante actualizado correctamente',
        estudiante
    })
}

//eliminar estudiante
const eliminarEstudiante = (req,res) => {
    const id = parseInt(req.params.id)
    const indice = estudiantes.findIndex(est => est.id === id)

    if(indice === -1){
        return res.status(404).json({
            mensaje: 'estudiante no encotnrado'
        })
    }

    const eliminado = estudiantes.splice(indice, 1)

    res.json({
        mensaje: 'Estudiante eliminado correctamente',
        estudiante : eliminado[0]
    })
}
module.exports = {
    obtenerEstudiantes,
    obtenerEstudianteporId,
    crearEstudiante, 
    actualizarEstudiante,
    eliminarEstudiante
}