(function () {
    const getUrlParameter = function (sParam) {
        const sPageURL = decodeURIComponent(window.location.search.substring(1));
        const sURLVariables = sPageURL.split('&');
        let sParameterName;
        for (let int = 0; int < sURLVariables.length; int = int + 1) {
            sParameterName = sURLVariables[int].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    const visAlleKategorier = function () {
        fetch("http://localhost:1337/kategorier")
            .then(function (result) {
                return result.json();
            })
            .then(function (kategorier) {
                const myDiv = document.querySelector(".myDiv");
                const h2 = document.createElement("H2");
                const h2Text = document.createTextNode("Alle kategorier");
                h2.appendChild(h2Text);
                myDiv.appendChild(h2);
                kategorier.forEach(function (kategori) {
                    const div = document.createElement("DIV");
                    const h3 = document.createElement("H3");
                    var a = document.createElement("A");
                    a.setAttribute("href", "produkter.html?kategori=" + kategori.kategori);
                    const navn = document.createTextNode(kategori.kategori);
                    h3.appendChild(navn);
                    div.setAttribute("class", "col-xs-6 col-sm-4 col-md-3 produktDiv")
                    a.appendChild(h3);
                    div.appendChild(a);
                    myDiv.appendChild(div);


                })

            });
    }
    const visEnKategori = function (kategori) {
        fetch("http://localhost:1337/produkter")
            .then(function (result) {
                return result.json();
            })
            .then(function (kategorier) {
                const myDiv = document.querySelector(".myDiv");
                const h2 = document.createElement("H2");
                const h2Text = document.createTextNode(kategori);
                h2.appendChild(h2Text);
                myDiv.appendChild(h2);
                kategorier.forEach(function (kat) {
                    if (kategori === kat.kategori) {

                        const div = document.createElement("DIV");
                        const billedeDiv = document.createElement("DIV");
                        const h3 = document.createElement("H3");
                        const img = document.createElement("img");
                        var a = document.createElement("A");
                        var anchor = document.createElement("A");

                        a.setAttribute("href", "produkter.html?produktnr=" + kat.id);
                        anchor.setAttribute("href", "produkter.html?produktnr=" + kat.id);
                        const navn = document.createTextNode(kat.navn);
                        img.setAttribute("src", "./assets/media/" + kat.billede)
                        h3.appendChild(navn);
                        div.setAttribute("class", "col-xs-12 col-sm-6 col-md-3 produktDiv")
                        anchor.appendChild(img);
                        div.appendChild(anchor);
                        anchor.setAttribute("class", "equalImage");
                        a.appendChild(h3);
                        div.appendChild(a);
                        myDiv.appendChild(div);
                    }

                })
                setTimeout(function () { equalColumns(); }, 30);

            });

    }
    const visEnProdukt = function (produkt) {
        fetch("http://localhost:1337/produkter")
            .then(function (result) {
                return result.json();
            })
            .then(function (produkter) {

                produkter.forEach(function (prod) {                    
                    if (produkt == prod.id) {
                        const myDiv = document.querySelector(".myDiv");
                        const h2 = document.createElement("H2");
                        const h2Text = document.createTextNode(prod.navn);
                        var div = document.createElement("DIV");
                        const billedeDiv = document.createElement("DIV");
                        const h3 = document.createElement("H3");
                        const img = document.createElement("img");
                        h2.appendChild(h2Text);
                        myDiv.appendChild(h2);
                       
                        const navn = document.createTextNode(prod.navn);
                        img.setAttribute("src", "./assets/media/" + prod.billede)
                        h3.appendChild(navn);
                        div.setAttribute("class", "col-xs-12 col-md-6 produktDiv")
                        div.appendChild(img);
                        myDiv.appendChild(div);
                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-12 col-md-6 produktDiv")


                    }

                })
                setTimeout(function () { equalColumns(); }, 30);

            });

    }
    document.addEventListener("DOMContentLoaded", function () {
        if (getUrlParameter("kategori")) {
            visEnKategori(getUrlParameter("kategori"));
        }
        else if (getUrlParameter("produktnr")) {
            visEnProdukt(getUrlParameter("produktnr"));

        }
        else {
            visAlleKategorier();
        }

    });



})();