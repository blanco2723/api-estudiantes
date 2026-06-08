require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

const estudiantesRoutes = require('./routes/estudiantesRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/',(req,res) => {
    res.send('API funcionando correctamente')
})

app.use('/estudiantes',estudiantesRoutes)
app.use('/auth', authRoutes)
app.use('/uploads',express.static(
    path.join(__dirname,'uploads')
))

app.listen(PORT, () =>{
    console.log(`Servidor ejecutando en puerto ${PORT}`)
})