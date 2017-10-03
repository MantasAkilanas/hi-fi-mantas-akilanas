document.getElementById("save").addEventListener('click', (event) => {

    event.preventDefault();
    var brugernavn = document.getElementById("brugernavn");
    var password = document.getElementById("password");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    checker = true;
    let init = {
        method: 'POST',
        headers: headers,
        body: `{"brugernavn":"${brugernavn.value}","password":"${password.value}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    var checker = true;
    if (brugernavn.value.length == 0) {
        checker = false;
        brugernavn.style.backgroundColor = "red";
    }
    if (password.value.length == 0) {
        checker = false;
        password.style.backgroundColor = "red";
    }
    if (checker) {
        let request = new Request('http://localhost:1337/login', init);
        fetch(request)
            .then(function (answer) {
                return answer.json()
            })
            .then(function (stuff) {
                const overlay = document.querySelector(".overlay");
                const h2 = document.createElement("H2");
                const h2text = document.createTextNode(stuff.message);
                overlay.innerHTML = "";
                h2.appendChild(h2text);
                overlay.appendChild(h2);
                document.querySelector(".overlay").style.display = "block";


            })
    }
});
document.querySelector(".overlay").addEventListener("click", (event) => {
    document.querySelector(".overlay").style.display = "none";
})