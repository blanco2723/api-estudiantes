const express = require('express')
const router = express.Router()

const validarEstudiante = require('../middlewares/validarEstudiante')
const authMiddleware = require('../middlewares/authMiddleware')
const verificarRol = require('../middlewares/rolMiddleware')
const upload = require('../middlewares/uploadMiddleware')

const {
    obtenerEstudiantes,
    obtenerEstudianteporId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    obtenerMisEstudiantes,
    obtenerEstudiantesconUsuario,
    subirArchivo,
    subirFotoEstudiante
} = require('../controllers/estudiantesController')

router.get('/',authMiddleware,verificarRol('admin','docente','estudiante'), obtenerEstudiantes)

//ruta del edpoint 1
router.get('/mis-estudiantes',authMiddleware,verificarRol('admin','docente'), obtenerMisEstudiantes)

//ruta del edpoint 2
router.get('/con-usuario',authMiddleware,verificarRol('admin','docente'), obtenerEstudiantesconUsuario)

router.get('/:id',authMiddleware,verificarRol('admin','docente','estudiante'), obtenerEstudianteporId)

router.post('/',authMiddleware,verificarRol('admin','docente'),validarEstudiante, crearEstudiante)

router.put('/:id',authMiddleware,verificarRol('admin','docente'),validarEstudiante,actualizarEstudiante)

router.delete('/:id',authMiddleware,verificarRol('admin'), eliminarEstudiante)

router.post('/subir',authMiddleware, upload.single('archivo'),subirArchivo)

router.post('/:id/foto',authMiddleware,upload.single('archivo'),subirFotoEstudiante)

module.exports = router