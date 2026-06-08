async function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try{
        const respuesta = await fetch(
            'http://localhost:3000/auth/login',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email, password
                })
            }
        )
        const data = await respuesta.json()
        console.log(data)

        if(data.token){
            localStorage.setItem('token',data.token)
        }

        window.location.href = 'estudiantes.html'
    }
    catch(error){
        console.log(error)
    }
}