const areaLogin = document.querySelector('.area-login-adm')
const areaPost = document.querySelector('.area-post')
const inputEmail = document.querySelector('.area-login-adm .inputEmail')
const inputPassword = document.querySelector('.area-login-adm .inputPassword')
const inputSecret = document.querySelector('.area-login-adm .inputSecret')
const buttonLoginU = document.querySelector('.area-login-adm button')
const buttonLoggout = document.querySelector('.area-post .button-loggout')


buttonLoginU.addEventListener('click', async()=> {
  await loginUser2(inputEmail.value, inputPassword.value, inputSecret.value)
})
async function loginUser2(email, password, secret) {
  console.log(secret)
  const loginUser = await fetch(`/user/${secret}/`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
          email, password
      })
  })
  
}

