document.getElementById("username").addEventListener("focus",()=>{
    document.getElementById("user_error").style.color= "";
    document.getElementById("user_error").innerHTML = "";
})
document.getElementById("password").addEventListener("focus",()=>{
    document.getElementById("password_error").style.color= "";
    document.getElementById("password_error").innerHTML = "";
})
const btn = document.getElementById("login");
async function fetchData(){
    const body = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value
    }
    const response = await fetch('/login',{
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type":"application/json"}
    });
    const result = await response.json();
    if(result.user_ID != null){
        location.assign(`/user/${body.username}`);
    }
    else if(result.error.username.status){
        document.getElementById("user_error").style.color= "red";
        document.getElementById("user_error").innerHTML = result.error.username.message;
    }
    else{
        document.getElementById("password_error").style.color= "red";
        document.getElementById("password_error").innerHTML = result.error.password.message;
    }

}
btn.addEventListener("click",fetchData);