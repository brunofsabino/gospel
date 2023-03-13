const areaLogin = document.querySelector('.area-login-adm')
const areaPost = document.querySelector('.area-post')
const inputEmail = document.querySelector('.area-login-adm .inputEmail')
const inputPassword = document.querySelector('.area-login-adm .inputPassword')
const buttonLoginU = document.querySelector('.area-login-adm button')
const buttonLoggout = document.querySelector('.area-post .button-loggout')

// const buttonPost = document.querySelector('.area-post .btn-post')
// const idPost = document.querySelector('.area-post .id-post')

// const img = document.querySelector('.img-form')
// let selectedFile 
// const file =  new FileReader();
// img.onchange = () => {
//   selectedFile = img.files[0];
//   console.log(selectedFile);
// }
// if(img) {
//    file.readAsDataURL(img);
// }
// console.log(img)
// buttonPost.addEventListener('click', item => postSend(item))
// async function postSend(item) {
//   item.preventDefault()
//   if(idPost) {
//     const loginUser = await fetch(`http://localhost:4000/post/${idPost}`, {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//       selectedFile
//     })
//   })
// const json = await loginUser.json();
//   }
  
// }
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
   
    localStorage.setItem("token", json.token);
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
