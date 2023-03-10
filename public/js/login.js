const areaLogin = document.querySelector('.area-login-adm')
const areaPost = document.querySelector('.area-post')
const inputEmail = document.querySelector('.area-login-adm .inputEmail')
const inputPassword = document.querySelector('.area-login-adm .inputPassword')
const buttonLoginU = document.querySelector('.area-login-adm button')
const buttonLoggout = document.querySelector('.area-login-adm .button-loggout')

buttonLoginU.addEventListener('click', async()=> {
  await loginUser2(inputEmail.value, inputPassword.value)
})
async function loginUser2(email, password) {
  const loginUser = await fetch(`http://localhost:4000/loginAdm`, {
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
      //oginSucess(json)
      localStorage.setItem("token", json.token);
      //localStorage.setItem('id', json.id)
      areaLogin.style.display = "none";
      areaPost.style.display = "flex";
  }
}
buttonLoggout.addEventListener('click', loggoutUser)

function loggoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('email')
  localStorage.removeItem('name')
  areaLogin.style.display = "flex";
  areaPost.style.display = "none";
  location.reload() 
}
async function getUser() {
  const token = localStorage.getItem('token')
  const user = await fetch(`http://localhost:4000/userAdmToken/${token}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  })
  const json = await user.json()
  if(json.id) {
      //userLogged(json.id)
      areaLogin.style.display = "none";
      areaPost.style.display = "flex";
      return json.id
  }
}
getUser()