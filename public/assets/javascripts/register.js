document.getElementById("save").addEventListener('click', (event) => {

    event.preventDefault();
    var brugernavn = document.getElementById("brugernavn");
    var password = document.getElementById("password");
    var passwordR = document.getElementById("passwordR");
    var email = document.getElementById("email");
    var emailR = document.getElementById("emailR");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    checker = true;
    let init = {
        method: 'POST',
        headers: headers,
        body: `{"brugernavn":"${brugernavn.value}","password":"${password.value}","email":"${email.value}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    var checker = true;
    if(brugernavn.value.length == 0){
        checker = false;
        brugernavn.style.backgroundColor = "red";
    }
    if(password.value.length == 0){
        checker = false;
        password.style.backgroundColor = "red";
    }
    if(password.value != passwordR.value){
        checker = false;
        password.style.backgroundColor = "red";
        passwordR.style.backgroundColor = "red";
    }
    if(email.value.length == 0){
        checker = false;
        email.style.backgroundColor = "red";
    }
    if(email.value != emailR.value){
        checker = false;
        email.style.backgroundColor = "red";
        emailR.style.backgroundColor = "red";
    }
    if(checker){
        let request = new Request('http://localhost:1337/createAccount', init);
        fetch(request)
        .then(function (answer){
            return answer.json()
        })
        .then(function (stuff){
            const overlay = document.querySelector(".overlay");
            const h2 = document.createElement("H2");
            if (stuff.message == "Data indsat") {
                const h2text = document.createTextNode("succes");
                overlay.innerHTML = "";
                h2.appendChild(h2text);
                overlay.appendChild(h2);
                document.querySelector(".overlay").style.display = "block";
                checker = false;
            }
            else{
                const h2text = document.createTextNode("brugernavn eller email optaged");
                overlay.innerHTML = "";
                h2.appendChild(h2text);
                overlay.appendChild(h2);
                document.querySelector(".overlay").style.display = "block";
                checker = false;
            }
            
        })
    }
});
document.querySelector(".overlay").addEventListener("click", (event) => {
    document.querySelector(".overlay").style.display = "none";
})