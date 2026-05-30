const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const estudiantes =[
    {
        id: 1, 
        nombre: 'Juan Perez',
        curso: '5to A'
    },
    {
        id:2,
        nombre: 'Maria Lopez',
        curso: '5to B'
    }
]

//Ruta principal
app .get('/',(req, res)=>{
    res.send('Api funcionando correctamente')
})

//Obtener todos los estudiantes 
app.get('/estudiantes',(req, res) => {
    res.json(estudiantes)
})

//Crear estudiante
app.post('/estudiantes', (req,res) => {
    const nuevoEstudiante = req.body
    estudiantes.push(nuevoEstudiante)

    res.json({
        mensaje: "Estudiante agregado correctamente",
        estudiante: nuevoEstudiante
    })
})

//obtener estudiante por ID 
app.get('/estudiantes/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const estudiante = estudiantes.find(est => est.id === id)

    if (!estudiante){
        return res.status(404).json({
            mensaje: 'estudiante no encontrado'
        })
    }
    res.json(estudiante)
})

//actualizar estudiante 
app.put('/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const estudiante= estudiantes.find(est => est.id === id)

    if (!estudiante){
        return res.status(404).json({
            mensaje: 'Esstudainte no encontrado'
        })
    }

    estudiante.nombre = req.body.nombre
    estudiante.curso = req. body.curso

    res.json({
        mensaje: 'Estudiante actualizado correctamente',
        estudiante
    })
})

//eliminar estudiante
app.delete('/estudiantes/:id',(req,res) => {
    const id = parseInt(req.params.id)
    const indice = estudiantes.findIndex(est => est.id === id)

    if (indice === -1){
        return res.status(404).json({
            mensaje: 'Estudiante no encontrado'
        })
    }
    const eliminado = estudiantes.splice(indice, 1)

    res.json({
        mensaje: 'Estudiante eliminado correctamente',
        estudiante: eliminado[0]
    })
})


app.listen(PORT, () =>{
    console.log(`Servidor ejecutando en puerto ${PORT}`)
})