(() => {
    producentSearch();
    document.querySelector("#createProducent").addEventListener("click", (event) => {
        var navn = document.querySelector("#navn").value;
        var id = document.querySelector("#id").value;
        var id2 = document.querySelector("#id2").value;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let init = {
            method: 'POST',
            headers: headers,
            body: `{"navn":"${navn}","id":"${id}","id2":"${id2}"}`,
            cache: 'no-cache',
            mode: 'cors'
        };
        let request = new Request('http://localhost:1337/createProducent', init);
        fetch(request)
            .then(function () {
                producentSearch();
                
            })

    })
    document.querySelector("#producentSearch").addEventListener("input", (event) => {
        producentSearch();

    })
    function producentSearch() {
        fetch(`http://localhost:1337/producent`)
            // fetch(`http://localhost:1337/producent/${document.querySelector("#searchValue2").value}`)
            .then((result) => {
                return result.json();
            })
            .then((producent) => {
                const searchOutput = document.querySelector("#searchOutput");
                searchOutput.innerHTML = "";
                producent.forEach(function (element) {
    
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
                            let headers = new Headers();
                            headers.append('Content-Type', 'application/json');
                            let init = {
                                method: 'PUT',
                                headers: headers,
                                body: `{"navn":"${element.navn}","id":"${element.id}"}`,
                                cache: 'no-cache',
                                mode: 'cors'
                            };
                            let request = new Request('http://localhost:1337/deleteProducent', init);
                            fetch(request)
                            .then(producentSearch())
    
    
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
                            let request = new Request('http://localhost:1337/deletePermaProducent', init);
                            fetch(request)
                            .then(producentSearch())
    
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

