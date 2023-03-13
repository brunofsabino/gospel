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
  const loginUser = await fetch(`http://localhost:4000/user/${secret}/`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
          email, password
      })
  })
  // const json = await loginUser.json();
  // if(json) {
  //   return true
  // }
  // if(json) {
  //   const loginUser2 = await fetch(`http://localhost:4000/user/${secret}`, {
  //     method: 'GET',
  //     headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //   }
  //   })
  //   if(loginUser2) {
  //     console.log(loginUser2)
  //   }
  // }
  // if(json.id){
   
  //   localStorage.setItem("token", json.token);
  //   areaLogin.style.display = "none";
  //   areaPost.style.display = "flex";
  // }
}
// buttonLoggout.addEventListener('click', loggoutUser)

// function loggoutUser() {
//   localStorage.removeItem('token')
//   localStorage.removeItem('id')
//   localStorage.removeItem('email')
//   localStorage.removeItem('name')
//   areaLogin.style.display = "flex";
//   areaPost.style.display = "none";
//   location.reload() 
// }
