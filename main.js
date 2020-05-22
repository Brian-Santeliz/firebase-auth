//signup
const signupForm = document.getElementById('form-signup');


const logOut = document.querySelectorAll('.log-out')
const logIn = document.querySelectorAll('.log-in')
//muestra enlace dinamicamente
const loginCheck=  (user)=>{
    if(user){
        logIn.forEach(element=>element.style.display='block')
        logOut.forEach(element=>element.style.display='none')
        
    }else{
        logIn.forEach(element=>element.style.display='none')
        logOut.forEach(element=>element.style.display='block')
    }
}

signupForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value

    auth.createUserWithEmailAndPassword(email,password)
        .then(userCreate=>{
            signupForm.reset();

            //close the modal 
            $('#signupModal').modal('hide')
            console.log('creado')
        })
        
});

const signinForm = document.getElementById('form-login');

signinForm.addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
        auth.signInWithEmailAndPassword(email,password)
        .then(userLogin=>{
           
                signinForm.reset();
                //close the modal 
                $('#signinModal').modal('hide')
        })
        .catch((e)=>{
            console.log('error', e)
        })


})

logout = document.getElementById('logout')

logout.addEventListener('click', e=>{
    e.preventDefault()
    auth.signOut()
        .then(()=>{
            console.log('salio')
        })

        
})

//facebook login
const fbBtn = document.getElementById('fb-btn')
fbBtn.addEventListener('click', e=>{
    e.preventDefault();
    const provider =new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(res=>{
            console.log(res)
            console.log('logueado con fb')
        })
        .catch(e=>{
            console.log(e)
        })
})

//google login

const googleBtn = document.getElementById('google-btn')

googleBtn.addEventListener('click', e=>{
    e.preventDefault();
    //accediendo a la autenticacion con google
    const provider= new firebase.auth.GoogleAuthProvider();
    //crea una ventana aparte y recibe el objeto provider
    auth.signInWithPopup(provider)
        .then(res=>{
            console.log('signin')
            signinForm.reset();
                //close the modal 
                $('#signinModal').modal('hide')
        })
        .catch(e=>console.log(e))
})


//Users
const users = document.getElementById('users')
const showUsers = data =>{
    if(data.length > 0){
        let html = '';

        data.forEach(element=>{
        //accediendo a los datos
        const datos =element.data();
        html += `
            <li class="list-group-item list-group-action">
                <h5>${datos.nombre} - ${datos.nickName}</h5>
                <p>${datos.descripcion} - ${datos.completado}</p>
            </li>
        `;
        users.innerHTML = html
    })
    }else{
        users.innerHTML = `<p class="text-center">Logueate para ver los usuarios</p>`
    }
}

//Eventos

//listar para los usarios autenticad
auth.onAuthStateChanged(user=>{
    if(user){
        store.collection('usuarios')
            .get()
            .then(snap=>{
                showUsers(snap.docs)
                loginCheck(user)
            })
            
    }else{
        showUsers([])
        loginCheck(user)
    }
})