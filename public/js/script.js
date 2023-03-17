
const body = document.querySelector('body')
const buttonEnter = document.querySelector('.button-enter') 
const areaAlertsUser = document.querySelector('.area-alerts')
const areaPersonaUser = document.querySelector('.header-persona')
const areaPersonaAUser = document.querySelector('.header-persona a')
const areaPersonaIMGUser = document.querySelector('.header-persona a img')
const areaConfigUser = document.querySelector('.header-persona-open')
const openConfigUser = document.querySelector('.header-persona-open a')
const areaConfigLoggoutUser = document.querySelector('.header-persona-perfil')
const areaPerfilUser = document.querySelector('.area-persona-perfil')
const areaLoggoutUser = document.querySelector('.area-persona-logout')


const buttonCloseModal = document.querySelector('.modal-login-home-close')
const backgroundModalHome = document.querySelector('.modal-login-home')
const modalHome = document.querySelector('.modal-login-home-content-close')


const h3Modal = document.querySelector('.modal-login-home-content h3')
const inputEmailModal = document.querySelector('.modal-login-home-content .email')
const inputNameModal = document.querySelector('.modal-login-home-content .nameInput')
const inputPasswordModal = document.querySelector('.modal-login-home-content .password')
const inputPassword2Modal = document.querySelector('.modal-login-home-content .p2assword')
const buttonContinuesEmail = document.querySelector('.modal-login-home-content .buttonEmail')
const buttonRegister = document.querySelector('.modal-login-home-content .buttonLogin')
const buttonLogin = document.querySelector('.modal-login-home-content .buttonLoginEmail')
const buttonGoogle = document.querySelector('.modal-login-home-content .buttonGoogle')
const pEmailModal = document.querySelector('.modal-login-home-content .modal-login-home-inputs-p')
const pNameModal = document.querySelector('.modal-login-home-content .modal-login-home-inputs-p-n')
const pPasswordModal = document.querySelector('.modal-login-home-content .modal-login-home-inputs-p-p')
const pPassword2Modal = document.querySelector('.modal-login-home-content .modal-login-home-inputs-p-p2')
const pGoogleModal = document.querySelector('.modal-login-home-content .modal-login-home-g')
const pNoticeEmail = document.querySelector('.modal-login-home-content .notice-email')
const pNoticeName = document.querySelector('.modal-login-home-content .notice-name')
const pNoticePassword = document.querySelector('.modal-login-home-content .notice-password')
const pNoticePassword2 = document.querySelector('.modal-login-home-content .notice-password2')


buttonEnter.addEventListener('click', item => openModal(item))
modalHome.addEventListener('click', closeModal)
buttonCloseModal.addEventListener('click', closeModal)

function openModal(item) {
  item.preventDefault();
  body.style.overflow = 'hidden'
  backgroundModalHome.style.display = 'flex'
  setTimeout( ()=>{
    backgroundModalHome.style.opacity = 1
}, 400);
}
function closeModal() {
  body.style.overflow = 'auto'
  backgroundModalHome.style.opacity = 0
  setTimeout( ()=>{
    backgroundModalHome.style.display = 'none'
    closeInputsRegisterEmail()
}, 400);
}

buttonContinuesEmail.addEventListener('click', (item) => {
    const email = inputEmailModal.value
    const emailValid = validateEmail(email)
    if(!emailValid) {
        pNoticeEmail.innerText = 'Informe um e-mail valido'
    } else {
        findByEmail(email)
    }
} )


inputPasswordModal.addEventListener('focus', noticePassword)
inputPasswordModal.addEventListener('keyup', item => countNoticePassword(item))
inputPassword2Modal.addEventListener('focus', noticePassword2)
inputPassword2Modal.addEventListener('keyup', item => countNoticePassword2(item))

function noticePassword() {
    if(inputPasswordModal.value.length < 8) {
        pNoticePassword.innerText = 'A senha deve contar ao menos 8 digitos!'
    }
}
function noticePassword2() {
    if(inputPasswordModal.value !== inputPassword2Modal.value) {
        pNoticePassword2.innerText = 'A senha deve igual a digitada anteriormente'
    }
}
function countNoticePassword(item) {
    const count = inputPasswordModal.value.length 
    if(count == 8) {
        pNoticePassword.innerText = ''
    }
}
function countNoticePassword2(item) {
    if(inputPasswordModal.value === inputPassword2Modal.value) {
        pNoticePassword2.innerText = ''
    }
    if(inputPasswordModal.value !== inputPassword2Modal.value) {
        pNoticePassword2.innerText = 'A senha deve igual a digitada anteriormente'
    }
}
function openInputs() {
    const email = validateEmail(inputEmailModal.value)
    if(email){
        pNoticeEmail.innerText = ''
        openInputsRegisterEmail()
    } else {
        pNoticeEmail.innerText = 'Informe um e-mail valido'
    }
}
function toDoLogin() {
    buttonContinuesEmail.style.display = 'none'
    buttonGoogle.style.display = 'none'
    pGoogleModal.style.display = 'none'
    pNoticePassword.style.display = 'none'
    inputPasswordModal.style.display = 'flex'
    buttonLogin.style.display = 'flex'
    pEmailModal.style.display = 'flex'
    pPasswordModal.style.display = 'flex'
    h3Modal.innerText = 'Faça o Login em sua conta!'
}
function openInputsRegisterEmail(){
    buttonContinuesEmail.style.display = 'none'
    buttonGoogle.style.display = 'none'
    pGoogleModal.style.display = 'none'
    inputNameModal.style.display = 'flex'
    inputPasswordModal.style.display = 'flex'
    inputPassword2Modal.style.display = 'flex'
    buttonRegister.style.display = 'flex'
    pEmailModal.style.display = 'flex'
    pNameModal.style.display = 'flex'
    pPasswordModal.style.display = 'flex'
    pPassword2Modal.style.display = 'flex'
    
}
function closeInputsRegisterEmail() {
    buttonContinuesEmail.style.display = 'flex'
    buttonGoogle.style.display = 'flex'
    pGoogleModal.style.display = 'flex'
    inputNameModal.style.display = 'none'
    inputPasswordModal.style.display = 'none'
    inputPassword2Modal.style.display = 'none'
    buttonRegister.style.display = 'none'
    buttonLogin.style.display = 'none'
    pEmailModal.style.display = 'none'
    pNameModal.style.display = 'none'
    pPasswordModal.style.display = 'none'
    pPassword2Modal.style.display = 'none'
    pNoticeEmail.innerText = ''
    inputPasswordModal.value = ''
    inputPassword2Modal.value = ''
    pNoticePassword.innerText = ''
    pNoticePassword2.innerText = ''
    setTimeout( ()=>{
        buttonLogin.style.backgroundColor = 'var(--orange-black)'
        h3Modal.innerText = 'Entre gratuitamente para o Opinião Gospel'
        buttonLogin.innerText = 'Login'
        buttonRegister.style.backgroundColor = 'var(--orange-black)'
        buttonRegister.innerText = 'Continuar'
    }, 1000);
    
}
function validateEmail (emailCapturadoDoFormulario) {
   let validarRegExNoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (emailCapturadoDoFormulario.match(validarRegExNoEmail)) {
     return true; 
   } else {
     return false; 
   }
}
function loginSucess(user) {
    buttonLogin.style.backgroundColor = '#0cc70cfc'
    buttonLogin.innerText = 'Login feito com sucesso'
    setTimeout( ()=>{
        closeModal()
    }, 500);
    userLogged(user)
}
function createSucess(user) {
    buttonRegister.style.backgroundColor = '#0cc70cfc'
    buttonRegister.innerText = 'Conta criada com sucesso'
    setTimeout( ()=>{
        closeModal()
    }, 500);
    userLogged(user)
}
function userLogged(user) {
    buttonEnter.style.display = 'none'
    areaAlertsUser.style.display = 'flex'
    areaPersonaUser.style.display = 'flex'
    areaConfigUser.style.display = 'flex'
    areaPerfilUser.setAttribute('id', user.id)
}
function loggoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    location.reload() 
}
// function toggleAreaUser(item) {
//     item.preventDefault()
//     areaConfigLoggoutUser.classList.toggle('close')
// }
async function openPageMyPerfil(item) {
    const idUser = areaPerfilUser.getAttribute('id')
    //const user = await getUser(idUser)
    window.open(`http://localhost:4000/user/${user.id}`, '_blank')
    // window.location.href = `http://localhost:4000/user/${user.id}`
    alterar_url(`http://lnovo/perfil/${user.name}`)
    // history.pushState(null, null, `http://localhost/opiniaogospel/public/perfil/${user.name}`)
    // const pagePerfil = await getUserPerfil(idUser, user.name)
    // const urlParams = new URLSearchParams('file:///C:/Projetos/opiniaogospel/public/perfil/perfil.html')
    // urlParams.set('id', user.id)
    // console.log(urlParams)
    // window.location.href = 'file:///C:/Projetos/opiniaogospel/public/perfil/perfil.html'
}
function alterar_url(nova){
    history.pushState({}, null, nova);
  }
//areaPerfilUser.addEventListener('click', item => openPageMyPerfil(item))
// areaPersonaAUser.addEventListener('click', item => toggleAreaUser(item))
// areaPersonaIMGUser.addEventListener('click', item => toggleAreaUser(item))
// areaPersonaUser.addEventListener('click', item => toggleAreaUser(item))
// openConfigUser.addEventListener('click',  item => toggleAreaUser(item))

areaLoggoutUser.addEventListener('click', loggoutUser)

buttonRegister.addEventListener('click', item => {
    sendDataNewUser(inputEmailModal.value, inputNameModal.value, inputPasswordModal.value, inputPassword2Modal.value)
})
buttonLogin.addEventListener('click', item => {
    loginUser(inputEmailModal.value, inputPasswordModal.value)
})

async function sendDataNewUser(email, name, password, password2) {
    pNoticePassword2.innerHTML = ''
    pNoticeEmail.innerText = ''
    pNoticeName.innerText = ''
    const emailValid = validateEmail(email)
    if(!emailValid) {
        pNoticeEmail.innerText = 'Informe um e-mail valido'
    }
    if(name.length <= 2) {
        pNoticeName.innerText = 'Informe seu nome!'
    }
    if(password !== password2) {
        pNoticePassword2.innerText = 'A senha deve igual a digitada anteriormente'
    }
    const newUser = await registerNewUser(email, name, password, password2)
}

async function findByEmail(email) {
    const emailValid = validateEmail(email)
    if(emailValid) {
        const existsEmail = await fetch(`http://localhost:4000/user/email/${email}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const json = await existsEmail.json()
        if(json.error === 'E-mail não cadastrado') {
            openInputs()
        }
        if(json.id){
            toDoLogin()
        }
    } else {
        pNoticeEmail.innerText = 'Informe um e-mail valido'
    }
    
}
async function registerNewUser(email, name, password, password2) {
    if(password === password2) {
        const newUser = await fetch(`http://localhost:4000/user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                email, name, password
            })
        })
        const json = await newUser.json()
        if(json.id) {
            createSucess(json)
            localStorage.setItem("token", json.token);
            localStorage.setItem('id', json.id)
            areaPerfilUser.setAttribute('id', json.id)
        }
    } 
}

async function loginUser(email, password)  {
    const loginUser = await fetch(`http://localhost:4000/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            email, password
        })
    })
    const json = await loginUser.json();
    if(json.id){
        loginSucess(json)
        localStorage.setItem("token", json.token);
        localStorage.setItem('id', json.id)
        // console.log(token)
        // localStorage.setItem()
    }
}
// function getCookie(name) {

//     let cookie = {};
    
//     document.cookie.split(';').forEach(function(el) {
//       let [k,v] = el.split('=');
//       cookie[k.trim()] = v;
//     })
//     console.log(cookie[name])
//     return cookie[name];
    
//   }
  
//   const myCookie = getCookie("somecookie")
