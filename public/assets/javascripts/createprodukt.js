(() => {
    addEventListener("DOMContentLoaded", () => {
        fetch("http://localhost:1337/kategori")
            .then((results) => {
                return results.json();
            })
            .then((kategorier) => {
                kategorier.forEach(function (element) {
                    const kategori = document.querySelector("#kategori");
                    const option = document.createElement("OPTION");
                    const optiontext = document.createTextNode(element.navn);
                    option.appendChild(optiontext);
                    option.setAttribute("value", element.id)
                    kategori.appendChild(option);
                });
            });
        fetch("http://localhost:1337/producent")
            .then((results) => {
                return results.json();
            })
            .then((producent) => {
                producent.forEach(function (element) {
                    const kategori = document.querySelector("#producent");
                    const option = document.createElement("OPTION");
                    const optiontext = document.createTextNode(element.navn);
                    option.appendChild(optiontext);
                    option.setAttribute("value", element.id)
                    kategori.appendChild(option);
                });
            })
    })
    kategoriSearch();
    
    document.querySelector("#produktform").addEventListener("submit", (event) => {
        event.preventDefault();
        alert("hej");
        // addEventListener("DOMContentLoaded", () => {
        //     document.querySelector("#form").addEventListener("submit", (event) => {
        let form = document.querySelector('#produktform')
        let data = new FormData(form);

        // ingen headers sendes med, browseren sætter automatisk de korrekte headers alt efter formens indhold
        let init = {
            method: 'post',
            body: data,
            cache: 'no-cache'
        };
        console.log(data)
        let request = new Request(`http://localhost:1337/createProdukt`, init);

        fetch(request)
        .then((result)=>{
            result.json();
        })
        .then((message)=>{
            console.log(message.message);
            // if(message.message == ){

            // }
        })


        // })
        // var navn = document.querySelector("#navn").value;
        // var id = document.querySelector("#id").value;
        // var id2 = document.querySelector("#id2").value;
        // var kategori = document.querySelector("#kategori").value;
        // var producent = document.querySelector("#producent").value;
        // var pris = document.querySelector("#pris").value;
        // var antal = document.querySelector("#antal").value;
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // let init = {
        //     method: 'POST',
        //     headers: headers,
        //     body: `{"navn":"${navn}","id":"${id}","id2":"${id2}","kategori":"${kategori}","producent":"${producent}","pris":"${pris}","antal":"${antal}"}`,
        //     cache: 'no-cache',
        //     mode: 'cors'
        // };
        // let request = new Request('http://localhost:1337/createProdukt', init);
        // fetch(request)
        //     .then(function () {
        //         kategoriSearch();

        //     })
        

    })
    document.querySelector("#kategoriSearch").addEventListener("input", (event) => {
        kategoriSearch();

    })
    function kategoriSearch() {
        fetch(`http://localhost:1337/alleprodukter`)
            // fetch(`http://localhost:1337/kategori/${document.querySelector("#searchValue2").value}`)
            .then((result) => {
                return result.json();
            })
            .then((produkt) => {
                const searchOutput = document.querySelector("#searchOutput");
                searchOutput.innerHTML = "";
                produkt.forEach(function (element) {

                    if (element.navn.includes(document.querySelector("#searchValue2").value) || element.id == document.querySelector("#searchValue2").value || element.kategori == document.querySelector("#searchValue2").value || element.producent == document.querySelector("#searchValue2").value) {

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-2");
                        var id = document.createTextNode(element.id);
                        var navn = document.createTextNode(element.navn);
                        var kategori = document.createTextNode(element.kategori);
                        var producent = document.createTextNode(element.producent);
                        var pris = document.createTextNode(element.pris);


                        var button = document.createElement("BUTTON");
                        var div = document.createElement("DIV");
                        var buttonText = document.createTextNode("ret");
                        button.appendChild(buttonText);
                        button.setAttribute("id", "buttonRet" + element.id);

                        div.setAttribute("class", "col-xs-3");
                        div.appendChild(button);

                        var button = document.createElement("BUTTON");
                        var buttonText = document.createTextNode("slet");
                        button.setAttribute("id", "buttonSlet" + element.id);
                        button.appendChild(buttonText);
                        div.appendChild(button);

                        var button = document.createElement("BUTTON");
                        var buttonText = document.createTextNode("perma slet");
                        button.setAttribute("id", "buttonPermaSlet" + element.id);
                        button.appendChild(buttonText);
                        div.appendChild(button);

                        searchOutput.appendChild(div);
                        document.querySelector(`#buttonRet${element.id}`).addEventListener("click", () => {
                            document.querySelector("#id").value = element.id;
                            document.querySelector("#navn").value = element.navn;
                            document.querySelector("#id2").value = element.id;
                            document.querySelector("#kategori").value = element.kateogoriid;
                            document.querySelector("#producent").value = element.producentid;
                            document.querySelector("#pris").value = element.pris;
                            document.querySelector("#antal").value = element.antal;
                            document.querySelector("#oldpicture").value = element.billede;

                        })
                        document.querySelector(`#buttonSlet${element.id}`).addEventListener("click", () => {
                            let headers = new Headers();
                            headers.append('Content-Type', 'application/json');
                            let init = {
                                method: 'PUT',
                                headers: headers,
                                body: `{"navn":"${element.navn}","id":"${element.id}"}`,
                                cache: 'no-cache',
                                mode: 'cors'
                            };
                            let request = new Request('http://localhost:1337/deleteProdukt', init);
                            fetch(request)
                                .then(kategoriSearch())


                        })
                        document.querySelector(`#buttonPermaSlet${element.id}`).addEventListener("click", () => {
                            let headers = new Headers();
                            headers.append('Content-Type', 'application/json');
                            let init = {
                                method: 'PUT',
                                headers: headers,
                                body: `{"navn":"${element.navn}","id":"${element.id}"}`,
                                cache: 'no-cache',
                                mode: 'cors'
                            };
                            let request = new Request('http://localhost:1337/deletePermaProdukt', init);
                            fetch(request)
                                .then(kategoriSearch())

                        })
                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-1");
                        div.appendChild(id);
                        searchOutput.appendChild(div);

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-2");
                        div.appendChild(navn);
                        searchOutput.appendChild(div);

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-2");
                        div.appendChild(kategori);
                        searchOutput.appendChild(div);

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-2");
                        div.appendChild(producent);
                        searchOutput.appendChild(div);

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-2");
                        div.appendChild(pris);
                        searchOutput.appendChild(div);

                    }

                });
            });
    }
})()