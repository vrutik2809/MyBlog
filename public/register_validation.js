const btn = document.getElementById("signup");
btn.addEventListener('click',async ()=>{
    const user_regex = /^[^ ]+$/;
    const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-z0-9]).{5,}$/
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if(!user_regex.test(username) && password_regex.test(password)){
        document.getElementById('lblusername').hidden = false; 
        document.getElementById('lblusername').style.color = 'red'; 
        document.getElementById('username').style.border = '2px solid red'; 
    }
    else if(user_regex.test(username) && !password_regex.test(password)){
        document.getElementById('lblpassword').hidden = false; 
        document.getElementById('lblpassword').style.color = 'red';
        document.getElementById('password').style.border = '2px solid red';  
    }
    else if(!user_regex.test(username) && !password_regex.test(password)){
        document.getElementById('lblusername').hidden = false; 
        document.getElementById('lblusername').style.color = 'red'; 
        document.getElementById('username').style.border = '2px solid red';
        document.getElementById('lblpassword').hidden = false; 
        document.getElementById('lblpassword').style.color = 'red';
        document.getElementById('password').style.border = '2px solid red';  
    }
    else{
        // btn.setAttribute('type','submit');
        const body = {
            username,
            password
        }
        const response = await fetch('/register',{
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type":"application/json"}
        });
        const result = await response.json();
        console.log(result);
        if(result.errors.username.includes("User aleardy exist")){
            document.getElementById('lblusername').hidden = false; 
            document.getElementById('lblusername').innerHTML = "User aleardy exist"; 
            document.getElementById('lblusername').style.color = 'red'; 
            document.getElementById('username').style.border = '2px solid red'; 
        }
        else{
            location.assign(`/user/${result.username}`);
        }
    }
})

document.getElementById('username').addEventListener('focus',()=>{
    document.getElementById('lblusername').hidden = true; 
    document.getElementById('lblusername').style.color = ''; 
    document.getElementById('username').style.border = ''; 
})

document.getElementById('password').addEventListener('focus',()=>{
    document.getElementById('lblpassword').hidden = true; 
    document.getElementById('lblpassword').style.color = ''; 
    document.getElementById('password').style.border = ''; 
})
