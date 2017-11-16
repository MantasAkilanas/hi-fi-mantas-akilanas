(() => {
    kategoriSearch();
    document.querySelector("#createKategori").addEventListener("click", (event) => {
        var navn = document.querySelector("#navn").value;
        var id = document.querySelector("#id").value;
        var id2 = document.querySelector("#id2").value;
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // let init = {

        // };
        // let request = new Request(, init);
        fetch('http://localhost:1337/createKategori', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'userID': localStorage.getItem('userid')
            },
            "body": `{"navn":"${navn}","id":"${id}","id2":"${id2}"}`,
            'mode': 'cors',
            'cache': 'default'
        })


            .then(function () {
                kategoriSearch();

            })

    })
    document.querySelector("#kategoriSearch").addEventListener("input", (event) => {
        kategoriSearch();

    })
    function kategoriSearch() {
        fetch(`http://localhost:1337/kategori`)
            // fetch(`http://localhost:1337/kategori/${document.querySelector("#searchValue2").value}`)
            .then((result) => {
                return result.json();
            })
            .then((kategori) => {
                const searchOutput = document.querySelector("#searchOutput");
                searchOutput.innerHTML = "";
                kategori.forEach(function (element) {

                    if (element.navn.includes(document.querySelector("#searchValue2").value) || element.id == document.querySelector("#searchValue2").value) {

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-4");
                        var id = document.createTextNode(element.id);
                        var navn = document.createTextNode(element.navn);


                        var button = document.createElement("BUTTON");
                        var div = document.createElement("DIV");
                        var buttonText = document.createTextNode("ret");
                        button.appendChild(buttonText);
                        button.setAttribute("id", "buttonRet" + element.id);

                        div.setAttribute("class", "col-xs-4");
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
                        })
                        document.querySelector(`#buttonSlet${element.id}`).addEventListener("click", () => {
                            // let headers = new Headers();
                            // headers.append('Content-Type', 'application/json');
                            // let init = {
                            //     method: 'PUT',
                            //     headers: headers,
                            //     body: `{"navn":"${element.navn}","id":"${element.id}"}`,
                            //     cache: 'no-cache',
                            //     mode: 'cors'
                            // };
                            // let request = new Request('http://localhost:1337/deleteKategori', init);
                            fetch('http://localhost:1337/deleteKategori', {
                                'method': 'PUT',
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('token'),
                                    'userID': localStorage.getItem('userid')
                                },
                                "body": `{"navn":"${element.navn}","id":"${element.id}"}`,
                                'mode': 'cors',
                                'cache': 'default'
                            })
                            .then(kategoriSearch())
                            // fetch(request)


                        })
                        document.querySelector(`#buttonPermaSlet${element.id}`).addEventListener("click", () => {
                            // let headers = new Headers();
                            // headers.append('Content-Type', 'application/json');
                            // let init = {
                            //     method: 'DELETE',
                            //     headers: {
                            //         'Authorization': localStorage.getItem('token'),
                            //         'userID': localStorage.getItem('userid')
                            //     },
                            //     body: `{"navn":"${element.navn}","id":"${element.id}"}`,
                            //     cache: 'no-cache',
                            //     mode: 'cors'
                            // };
                            // let request = new Request('http://localhost:1337/deletePermaKategori', init);
                            // fetch(request)
                            //     .then(kategoriSearch())
                            fetch('http://localhost:1337/deletePermaKategori', {
                                'method': 'DELETE',
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('token'),
                                    'userID': localStorage.getItem('userid')
                                },
                                "body": `{"navn":"${element.navn}","id":"${element.id}"}`,
                                'mode': 'cors',
                                'cache': 'default'
                            })
                            .then(kategoriSearch())

                        })
                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-4");
                        div.appendChild(id);
                        searchOutput.appendChild(div);

                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-4");
                        div.appendChild(navn);
                        searchOutput.appendChild(div);
                    }

                });
            });
    }
})();

