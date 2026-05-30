const supabase = require('../supabase')

//obtener todos los estudiantes
const obtenerEstudiantes = async (req,res) => {
   try{
        const {data, error} = await supabase.from('estudiantes').select('*')

    if(error){
        throw error
    }
    
    res.json(data)
   }
   catch(error){
        console.error(error)
        res.status(500).json({
            mensaje: 'Error al obtener estudiante',
            detalle: error.message
        })
   } 
}

//obtener por ID
const obtenerEstudianteporId = async (req,res) => {
    try{
        const id = parseInt(req.params.id)
    
        const{data, error} = await supabase.from('estudiantes')
        .select('*')
        .eq('id',id)
        .single()

        if(error){
            throw error
        }
        res.json(data)
    }
    catch(error){
        console.error(error)
        res.status(404).json({
            mensaje: 'Estudiante no encontrado',
            detalle: error.message
        })
    }
}

//Crear nuevo estudiante 
const crearEstudiante = async (req,res) => {
    try{
        const {nombre, curso} = req.body
        const {data, error} =await supabase.from('estudiantes')
        .insert([
        {
            nombre,
            curso
        }
        ])
        .select()

        if(error){
            throw error
        }

        res.json({
            mensaje: 'Estudiante creado correctamente ', 
            estudiante: data[0]
        })
    }
    catch(error){
        console.error (error)
        res.status(500).json({
                mensaje:'Error al crear estudiante',
                detalle: error.message
            })
    }
}

//Actualizar estudiante 
const actualizarEstudiante = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const {nombre, curso} = req.body
        
        const {data,error} = await supabase.from('estudiantes')
        .update({
            nombre,
            curso
        }) 
        .eq('id',id)
        .select()

        if(error){
            throw error
        }

        if (!data.length){
            return res.status(404).json({
                mensaje: 'Estudiante no encotrado'
            })
        }

        res.json({
            mensaje: 'Estudiante actualizado correctamente',
            estudiante: data[0]
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
                mensaje: 'Error al actualizar estudiante',
                detalle: error.message
            })
    }
}

//eliminar estudiante
const eliminarEstudiante = async (req,res) => {
    try{
        const id = parseInt(req.params.id)
    
        const {data, error} = await supabase.from('estudiantes')
        .delete()
        .eq('id',id)
        .select()

        if(error){
            throw error
        }

        if(!data.length){
            return res.status(404).json({
                mensaje: 'Estudiante no encontrado'
            })
        }

        res.json({
            mensaje: 'Estudiante eliminao correctamente ',
            estudiante: data[0]
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            mensaje: 'Error al eliminar estudiante', 
            detaller: error.message
        })
    }    
}

module.exports = {
    obtenerEstudiantes,
    obtenerEstudianteporId,
    crearEstudiante, 
    actualizarEstudiante,
    eliminarEstudiante
}