
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
    
}
