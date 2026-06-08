const supabase = require('../supabase')

/*//obtener todos los estudiantes sin filtro 
const obtenerEstudiantes = async (req,res) => {
   try{
        const pagina = parseInt(req.query.page) || 1
        const limite = 10
        
        const inicio = (pagina -1) * limite
        const fin = inicio + limite - 1


        console.log(req.query)
        const {data, error} = await supabase.from('estudiantes').select('*').range(inicio,fin)

    if(error){
        throw error
    }
    
    res.json({
        pagina,
        cantidad:data.length,
        datos:data 
    })
   }
   catch(error){
        console.error(error)
        res.status(500).json({
            mensaje: 'Error al obtener estudiante',
            detalle: error.message
        })
   } 
}
*/

//obtener estudiantes con filtro de nombre y curso 
const obtenerEstudiantes = async (req,res) => {
   try{
        const pagina = parseInt(req.query.page) || 1
        const limite = 10
        
        const inicio = (pagina -1) * limite
        const fin = inicio + limite - 1

        console.log(req.query)
        let query= supabase.from('estudiantes').select('*')

        console.log(typeof query)
console.log(query)

        if(req.query.nombre){
            query=query.ilike(
                'nombre',`%${req.query.nombre}%`
            )
        }

        if(req.query.curso){
            query = query.eq(
                'curso',req.query.curso
            )
        }

        if(req.query.page){
            query = query.range(inicio,fin)
        }

        if(req.query.orden){
            //query = query.order('nombre',{ascending:true})
            query = query.order('id',{ascending:false})
            //query = query.order('curso',{ascending:false})
        }

        const {data,error} = await query

        if(error){
            throw error
        }
        
        res.json({
            pagina,
            cantidad:data.length,
            datos:data 
        })
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
        const usuario_id = req.usuario.id
        const {data, error} =await supabase.from('estudiantes')
        .insert([
        {
            nombre,
            curso,
            usuario_id
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

//ENDPOINT 1 VER SOLO MIS ESTUDIANTES POR ID USUARIO
const obtenerMisEstudiantes = async (req,res) => {
   try{
        const usuario_id = req.usuario.id
        console.log(req.usuario)
        const {data, error} = await supabase.from('estudiantes').select('*').eq('usuario_id',usuario_id)

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

//ENDPOINT 2. mostrar al estudiante junto con su usuario 
const obtenerEstudiantesconUsuario = async (req, res) => {
    try{
        const {data, error} = await supabase.from('estudiantes')
        .select(`*,usuario(id,nombre,email,rol)`)

        if(error){
            throw error
        }

        res.json(data)
    }
    catch(error){
        res.status(500).json({
            mensaje:error.message
        })
    }
} 

//ENDPOIND 3 SUbir archivo
const subirArchivo = (req,res) => {
    res.json({
        mensaje:'Archivo subido',
        archivo: req.file
    })
}

const subirFotoEstudiante = async (req,res) => {
    try{
        const id = parseInt(req.params.id)
        if(!req.file){
            return res.status(400).json({
                mensaje: 'Debe seleccdionar una imagen'
            })
        }
        const {data, error} = await supabase.from('estudiantes')
        .update({foto:req.file.filename})
        .eq('id',id)
        .select()

        if(error){
            throw error
        }

        res.json({
            mensaje:'Foto actualizada',
            estudiante: data
        })
    }
    catch(error){
        res.status(500).json({
            mensaje:error.message
        })
    }
}

module.exports = {
    obtenerEstudiantes,
    obtenerEstudianteporId,
    crearEstudiante, 
    actualizarEstudiante,
    eliminarEstudiante,
    obtenerMisEstudiantes,
    obtenerEstudiantesconUsuario,
    subirArchivo,
    subirFotoEstudiante
}