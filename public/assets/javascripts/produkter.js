(function () {
    const getUrlParameter = function (sParam) {
        const sPageURL = decodeURIComponent(window.location.search.substring(1));
        const sURLVariables = sPageURL.split('&');
        let sParameterName = "";
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
                    a.setAttribute("href", "produkter.html?kategori=" + kategori.id);
                    const navn = document.createTextNode(kategori.kategori);
                    h3.appendChild(navn);
                    div.setAttribute("class", "col-xs-6 col-sm-4 col-md-3 produktDiv");
                    a.appendChild(h3);
                    div.appendChild(a);
                    myDiv.appendChild(div);


                })

            });
    }
    const visEnKategori = function (kategori) {
        fetch(`http://localhost:1337/produkter/${kategori}`)
            .then(function (result) {
                return result.json();
            })
            .then(function (kategorier) {
                const myDiv = document.querySelector(".myDiv");
                var firsttime = true;
                kategorier.forEach(function (kat) {

                    if (firsttime) {
                        const h2 = document.createElement("H2");
                        const h2Text = document.createTextNode(kat.kategori);
                        h2.appendChild(h2Text);
                        myDiv.appendChild(h2);
                        firsttime = false;
                    }

                    const div = document.createElement("DIV");
                    const billedeDiv = document.createElement("DIV");
                    const h3 = document.createElement("H3");
                    const img = document.createElement("img");
                    var a = document.createElement("A");
                    var anchor = document.createElement("A");

                    a.setAttribute("href", "produkter.html?produktnr=" + kat.id);
                    anchor.setAttribute("href", "produkter.html?produktnr=" + kat.id);
                    const navn = document.createTextNode(kat.navn);
                    img.setAttribute("src", "./assets/media/" + kat.billede);
                    h3.appendChild(navn);
                    div.setAttribute("class", "col-xs-12 col-sm-6 col-md-3 produktDiv");
                    anchor.appendChild(img);
                    div.appendChild(anchor);
                    anchor.setAttribute("class", "equalImage");
                    a.appendChild(h3);
                    div.appendChild(a);
                    myDiv.appendChild(div);

                })
                setTimeout(function () { equalColumns(); }, 30);

            });

    }
    const visEnProdukt = function (produkt) {
        fetch(`http://localhost:1337/produkt/${produkt}`)
            .then(function (result) {
                return result.json();
            })
            .then(function (produkter) {

                produkter.forEach(function (prod) {
                    if (produkt == prod.varenr) {
                        const myDiv = document.querySelector(".myDiv");
                        const h2 = document.createElement("H2");
                        const h2Text = document.createTextNode(prod.navn);
                        var div = document.createElement("DIV");
                        const img = document.createElement("img");
                        h2.appendChild(h2Text);
                        myDiv.appendChild(h2);
                        img.setAttribute("src", "./assets/media/" + prod.billede);
                        div.setAttribute("class", "col-xs-12 col-md-6 produktDiv");
                        div.appendChild(img);
                        myDiv.appendChild(div);
                        var div = document.createElement("DIV");
                        div.setAttribute("class", "col-xs-12 col-md-6 produktDiv");
                        Object.keys(prod).forEach(function (key) {
                            if (key !== "billede") {
                                var paragraph = document.createElement("P");
                                var value = document.createTextNode(key);
                                paragraph.setAttribute("class", "col-xs-6")
                                paragraph.appendChild(value);
                                div.appendChild(paragraph);
                                var paragraph = document.createElement("P");
                                var value = document.createTextNode(prod[key]);
                                paragraph.setAttribute("class", "col-xs-6")
                                paragraph.appendChild(value);
                                div.appendChild(paragraph);

                            }
                        });
                        myDiv.appendChild(div);
                    }
                })
                setTimeout(function () { equalColumns(); }, 30);
            });
    }
    const findProdukt = function (find) {
        fetch(`http://localhost:1337/search/${find}`)
            .then(function (result) {
                return result.json();
            })
            .then(function (fundet) {
                fundet.forEach(function (fund) {
                    const myDiv = document.querySelector(".myDiv");
                    const p = document.createElement("P");
                    const pText = document.createTextNode(fund.navn);
                    const a = document.createElement("A");
                    a.setAttribute("href", "produkter.html?produktnr=" + fund.id);
                    p.appendChild(pText);
                    a.appendChild(p);
                    myDiv.appendChild(a);
                    
                })
            });
    }
    document.addEventListener("DOMContentLoaded", function () {
        if (getUrlParameter("kategori")) {
            visEnKategori(getUrlParameter("kategori"));
        }
        else if (getUrlParameter("produktnr")) {
            visEnProdukt(getUrlParameter("produktnr"));

        }
        else if (getUrlParameter("find")) {
            findProdukt(getUrlParameter("find"));

        }
        else {
            visAlleKategorier();
        }

    });



})();