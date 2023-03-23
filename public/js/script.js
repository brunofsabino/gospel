
//const body = document.querySelector('body')
// const buttonEnter = document.querySelector('.button-enter') 
// const areaAlertsUser = document.querySelector('.area-alerts')
// const areaPersonaUser = document.querySelector('.header-persona')
// const areaPersonaAUser = document.querySelector('.header-persona a')
// const areaPersonaIMGUser = document.querySelector('.header-persona a img')
// const areaConfigUser = document.querySelector('.header-persona-open')
// const openConfigUser = document.querySelector('.header-persona-open a')
// const areaConfigLoggoutUser = document.querySelector('.header-persona-perfil')
// const areaPerfilUser = document.querySelector('.area-persona-perfil')
// const areaLoggoutUser = document.querySelector('.area-persona-logout')


async function home()  {
    const loginUser = await fetch(`/home`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: 'include'
    })
    const json = await loginUser.json();
    console.log(json)
    //     console.log(json)
    // if(json.id){
    //     loginSucess(json)
    //     console.log(json)
    //     localStorage.setItem('id', json.id)
    //     location.reload() 
    // }
}





//buttonEnter.addEventListener('click', item => openModal(item))


// function openModal(item) {
//   item.preventDefault();
//   body.style.overflow = 'hidden'
//   backgroundModalHome.style.display = 'flex'
//   setTimeout( ()=>{
//     backgroundModalHome.style.opacity = 1
// }, 400);
// }

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
