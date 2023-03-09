let totalSlides = document.querySelectorAll('.slider--item').length;
let sliderWidth = document.querySelector('.slider').clientWidth;
let currentSlide = 0;

const body = document.querySelector('body')
const buttonEnter = document.querySelector('.button-enter')
const buttonCloseModal = document.querySelector('.modal-login-home-close')
const backgroundModalHome = document.querySelector('.modal-login-home')
const modalHome = document.querySelector('.modal-login-home-content-close')


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


document.querySelector('.slider--width').style.width = 
    `${sliderWidth * totalSlides}px`;
document.querySelector('.slider--controls').style.width = 
    `${sliderWidth}px`;
document.querySelector('.slider--controls').style.height = 
    `${document.querySelector('.slider').clientHeight}px`;
function goPrev() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateMargin();
}
function goNext() {
    currentSlide++;
    if(currentSlide > (totalSlides-1)) {
        currentSlide = 0;
    }
    updateMargin();
}
function updateMargin() {
    let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft = 
        `-${newMargin}px`;
}
setInterval(goNext, 5000);

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
        buttonLogin.innerText = 'Login'
    }, 2000);
    
}
function validateEmail (emailCapturadoDoFormulario) {
   let validarRegExNoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (emailCapturadoDoFormulario.match(validarRegExNoEmail)) {
     return true; 
   } else {
     return false; 
   }
}
function loginsucess() {
    buttonLogin.style.backgroundColor = '#0cc70cfc'
    buttonLogin.innerText = 'Login feito com sucesso'
    setTimeout( ()=>{
        closeModal()
    }, 500);
    
}

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
        // json.error === 'E-mail não cadastrado' ?? openInputs()
        // json.id ?? toDoLogin()
        if(json.error === 'E-mail não cadastrado') {
            
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
        if(json.error === 'E-mail já cadastrado. Faça o login!') {
            console.log(json.error)
            
            // infoModal.innerHTML = json.error
            // exit
        }
        console.log(json)
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
        loginsucess()
    }
    console.log(json)
}
