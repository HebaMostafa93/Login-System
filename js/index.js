let nameInput = document.querySelector("#nameInput")
let emailInput = document.querySelector("#emailInput")
let passwordInput = document.querySelector("#passwordInput")

let signupBtn = document.querySelector("#signupBtn")
let loginBtn = document.querySelector("#loginBtn")

let inputsReq = document.querySelector("#inputsReq")
let incorrect = document.querySelector("#incorrect")
let exists = document.querySelector("#exists")

let nameAlert = document.querySelector("#nameAlert")
let emailAlert = document.querySelector("#emailAlert")
let passwordAlert = document.querySelector("#passwordAlert")

let userNameWelcome = document.querySelector("#userNameWelcome")

let usersList = []
if(localStorage.getItem("myUsers") != null) {
    usersList = JSON.parse(localStorage.getItem("myUsers"))
}

function sign() {
    if(valid( /^\w{3,}(\s+\w+)*$/,nameInput , nameAlert) == true && valid( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,emailInput , emailAlert) == true && valid( /^[a-zA-Z]\w{3,14}$/,passwordInput ,passwordAlert ) == true ) {
        if (repeat() == true) {
            exists.style.display = "block"
        }
        else {
        let user = {
            name : nameInput.value ,
            email : emailInput.value , 
            password : passwordInput.value
        }
        usersList.push(user)
        localStorage.setItem("myUsers" , JSON.stringify(usersList))
        clear()
        signupBtn.setAttribute("href" , "index.html")
        // location.replace("index.html")
    }
}
}

//sign up click
if(signupBtn != null) {
    signupBtn.addEventListener("click" , function() {
        if(nameInput.value == "" || emailInput.value == "" || passwordInput.value == "" ) {
            inputsReq.style.display = "block"
        }
        else{
            inputsReq.style.display = "none"
            sign()
        }
    } )
}

// Clear function
function clear() {
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
}

// Validation
if(nameInput != null) {
    nameInput.addEventListener("keyup" , function(){
        let regexName = /^\w{3,}(\s+\w+)*$/
        valid(regexName ,nameInput, nameAlert)
    })
}
if(emailInput != null) {
    emailInput.addEventListener("keyup" , function(){
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        valid(regexEmail ,emailInput , emailAlert)
    })
}
if(passwordInput != null) {
    passwordInput.addEventListener("keyup" , function(){
        let regexPassword = /^[a-zA-Z]\w{3,14}$/
        valid(regexPassword ,passwordInput , passwordAlert)
    })
}
function valid(regex , inputEl , alert) {
    if(regex.test(inputEl.value) == true){
        alert.style.display ="none"
        inputEl.classList.add("is-valid")
        inputEl.classList.remove("is-invalid")
        return true
    }
    else{
        alert.style.display ="block"
        inputEl.classList.add("is-invalid")
        inputEl.classList.remove("is-valid")
        return false
    }
}

// Login
if(loginBtn != null) {
    loginBtn.addEventListener("click" , function() {
        if(emailInput.value == "" || passwordInput.value == ""){
            inputsReq.style.display = "block"
        }
        else{
            inputsReq.style.display = "none"
            for (let i=0 ; i< usersList.length ; i++) {
                if(usersList[i].email.toLowerCase() == emailInput.value.toLowerCase() && 
                usersList[i].password == passwordInput.value ) {
                    localStorage.setItem("userName" , usersList[i].name)
                    loginBtn.href = "welcome.html"
                }
                else{
                    incorrect.style.display = "block"
                }
            }
        }
    } )
}
function repeat() {
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email.toLowerCase() == emailInput.value.toLowerCase()) {
            return true;
        }
    }
}

if(userNameWelcome != null) {
let x = localStorage.getItem("userName")
userNameWelcome.innerHTML = "Welcome " + x
}

function logOut() {
    localStorage.removeItem("userName")
}

