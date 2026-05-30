require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const estudiantesRoutes = require('./routes/estudiantesRoutes')

app.use(express.json())

app.get('/',(req,res) => {
    res.send('API funcionando correctamente')
})

app.use('/estudiantes',estudiantesRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor ejecutando en puerto ${PORT}`)
})