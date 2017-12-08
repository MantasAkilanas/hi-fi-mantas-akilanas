document.getElementById("save").addEventListener('click', (event) => {
    event.preventDefault();
    var navn = document.querySelector('#navn').value;
    var mobil = document.querySelector('#mobil').value;
    var email = document.querySelector('#email').value;
    var besked = document.querySelector('#besked').value;
    var checker = true;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let init = {
        method: 'POST',
        headers: headers,
        body: `{"navn":"${navn}","mobil":"${mobil}","email":"${email}","besked":"${besked}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    if (navn.length == 0) {
        document.getElementById("navn").style.backgroundColor = "red";
        checker = false;
    }
    else {
        document.getElementById("navn").style.backgroundColor = "white";
    }
    if (mobil.length !== 8) {
        document.getElementById("mobil").style.backgroundColor = "red";
        checker = false;
    }
    else {
        document.getElementById("mobil").style.backgroundColor = "white";
    }
    if (email.length == 0) {
        document.getElementById("email").style.backgroundColor = "red";
        checker = false;
    }
    else {
        document.getElementById("email").style.backgroundColor = "white";
    }
    if (email.length == 0) {
        document.getElementById("besked").style.backgroundColor = "red";
        checker = false;
    }
    else {
        document.getElementById("besked").style.backgroundColor = "white";
    }

    if (checker) {
        let request = new Request('http://188.226.163.223:1337/createKontakt', init);
        fetch(request)
            .then(function (result) {
                return result.json();
            })
            .then(function (succes) {
                const overlay = document.querySelector(".overlay");
                const h2 = document.createElement("H2");
                const h2text = document.createTextNode(succes.message);
                h2.appendChild(h2text);
                overlay.innerHTML = "";
                overlay.appendChild(h2);
                document.querySelector(".overlay").style.display = "block";
                document.querySelector('#navn').value = "";
                document.querySelector('#mobil').value = "";
                document.querySelector('#email').value = "";
                document.querySelector('#besked').value = "";
            })

    }
});
document.querySelector(".overlay").addEventListener("click", (event) => {
    document.querySelector(".overlay").style.display = "none";
})