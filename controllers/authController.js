const bcrypt = require('bcryptjs')
const supabase = require('../supabase')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try{
        const {nombre,email,password,rol} = req.body

        const passwordHash = await bcrypt.hash(password,10)

        const {data, error} = await supabase.from('usuario')
        .insert([
            {
                nombre, email, password:passwordHash,rol
            }
        ])
        .select()

        if(error){
            throw error
        }

        res.status(201).json({
            mensaje: 'Usuario registrado'
        })
    }
    catch(error){
        res.status(500).json({
            mensaje: error.message
        })
    }
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body
        const {data: usuario,error} = await supabase.from('usuario')
        .select('*')
        .eq('email',email)
        .single()

        if(error || !usuario){
            return res.status(401).json({
                mensaje: 'Credenciales invalidas'
            })
        }

        const passwordValida = await bcrypt.compare(password,usuario.password)

        if(!passwordValida){
            return res.status(401).json({
                mensaje: 'Credenciales invaslidas'
            })
        }
console.log(process.env.JWT_SECRET)
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        res.json({
            mensaje: 'Login correcto',
            token
        })
    }
    catch(error){
        res.status(500).json({
            mensaje: error.message
        })
    }
}

module.exports = {register,login}