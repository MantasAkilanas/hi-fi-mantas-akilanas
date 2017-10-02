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
            console.log(answer);
        })
    }
});