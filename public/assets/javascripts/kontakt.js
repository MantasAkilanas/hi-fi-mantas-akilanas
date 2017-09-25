document.querySelector('#save').addEventListener('click', (event) => {
    event.preventDefault();
    var navn = document.querySelector('#navn').value;
    var mobil = document.querySelector('#mobil').value;
    var email = document.querySelector('#email').value;
    var checker = true;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"navn":"${navn}","mobil":"${mobil}","email":"${email}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    if (navn.length == 0) {
        document.getElementById("navn").style.backgroundColor = "red";
        checker = false;
    }
    if (mobil.length !== 8) {
        document.getElementById("mobil").style.backgroundColor = "red";
        checker = false;
    }
    if (email.length == 0) {
        document.getElementById("email").style.backgroundColor = "red";
        checker = false;
    }
    if (checker) {







        fetch("http://localhost:1337/kontakt")
            .then(function (result) {
                return result.json();
            })
            .then(function (succes) {
                succes.forEach(function (succed) {
                    if (navn == succed.navn && mobil == succed.mobil && email == succed.email) {
                        const myDiv = document.querySelector(".myDiv");
                        const h2 = document.createElement("H2");
                        const h2text = document.createTextNode("already exist");
                        h2.appendChild(h2text);
                        myDiv.innerHTML = "";
                        myDiv.appendChild(h2);
                    }
                    else {


                        let request = new Request('http://localhost:1337/createKontakt', init);
                        fetch(request)
                            .then(response => {
                                console.log(response)
                            })
                            .catch(err => { console.log(err) }
                            );


                        fetch("http://localhost:1337/kontakt")
                            .then(function (result) {
                                return result.json();
                            })
                            .then(function (succes) {
                                var successed = false;
                                const myDiv = document.querySelector(".myDiv");
                                const h2 = document.createElement("H2");
                                const h2text = document.createTextNode("succes");
                                h2.appendChild(h2text);
                                succes.forEach(function (succed) {
                                    if (navn == succed.navn && mobil == succed.mobil && email == succed.email) {

                                        successed = true;

                                    }
                                })
                                if (successed) {
                                    myDiv.innerHTML = "";
                                    myDiv.appendChild(h2);
                                }


                            })
                    }
                })
            })
    }
});