const token = localStorage.getItem('token')

if(!token){
    window.location.href = 'login.html'
}

async function crearEstudiante(){
    const nombre = document.getElementById('nombre').value 
    const curso = document.getElementById('curso').value 

    try{
        const respuesta = await fetch('http://localhost:3000/estudiantes',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                nombre,
                curso
            })

        }
    )
    const data = await respuesta.json()
    console.log(data)
}
    catch(error){
        console.log(error)
    }
}

async function cargarEstudiantes() {
    try{
        const respuesta = await fetch('http://localhost:3000/estudiantes',
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        console.log(token)
        const data = await respuesta.json()
        console.log(data) 

        const lista = document.getElementById('lista')
        data.datos.forEach(estudiante => {
            lista.innerHTML += `
            <p>
                ${estudiante.nombre}
                -
                ${estudiante.curso}
            </p>
            `
        })

    }
    catch(error){
        console.log(error)
    }
}

function cerrarSesion(){
    localStorage.removeItem(
        'token'
    )
    window.location.href = 'login.html'
}


//llamada de la funcion 
cargarEstudiantes()