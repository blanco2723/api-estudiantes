const { z } = require('zod')

const estudianteSchema = z.object({
    nombre: z.string().min(3,'Nombre minimo 3 caracteres'),
    curso: z.string().min(2,'Curso invalido')
})

module.exports = estudianteSchema