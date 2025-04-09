console.log("this is signin");

async function signin(event){
    event.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value    

    try {
        const res = await fetch("http://localhost:5000/api/sign/loaduser",{
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username, password })
        })
        console.log(res);
        const data = await res.json()
        console.log(data);

        if(res.status===200){
            alert("Login Success")
        }else{
            alert("failed")
        }

    } catch (error) {
        console.log(error);
    }
}
