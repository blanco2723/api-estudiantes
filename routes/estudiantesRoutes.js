const express = require('express')
const router = express.Router()

const validarEstudiante = require('../middlewares/validarEstudiante')

const {
    obtenerEstudiantes,
    obtenerEstudianteporId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} = require('../controllers/estudiantesController')

router.get('/', obtenerEstudiantes)

router.get('/:id', obtenerEstudianteporId)

router.post('/',validarEstudiante, crearEstudiante)

router.put('/:id',actualizarEstudiante)

router.delete('/:id', eliminarEstudiante)

module.exports = router