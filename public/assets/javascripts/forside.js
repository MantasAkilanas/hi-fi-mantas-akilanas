(function(){
    const visNyesteProdukter = function (){
        fetch("http://localhost:1337/forside")
        .then(function(result){
            return result.json();
        })
        .then(function(nyesteProdukter){
            nyesteProdukter.forEach(function(nyesteProdukt) {
                const myDiv = document.querySelector(".myDiv");
                const div = document.createElement("DIV");
                const billedeDiv = document.createElement("DIV");
                const h3 = document.createElement("H3");
                const img = document.createElement("img");
                var a = document.createElement("A");
                var anchor = document.createElement("A");
                a.setAttribute("href","produkter.html?produktnr="+nyesteProdukt.id);
                anchor.setAttribute("href","produkter.html?produktnr="+nyesteProdukt.id);
                const navn = document.createTextNode(nyesteProdukt.navn);
                img.setAttribute("src","./assets/media/"+nyesteProdukt.billede)
                
                h3.appendChild(navn);
                div.setAttribute("class","col-xs-12 col-sm-6 col-md-3 produktDiv")
                anchor.appendChild(img);
                billedeDiv.appendChild(anchor);
                billedeDiv.setAttribute("class","equalImage");
                div.appendChild(billedeDiv);
                a.appendChild(h3);
                div.appendChild(a);
                myDiv.appendChild(div);
             
                
            })
            setTimeout(function(){ equalColumns(); }, 500);
            
        })
    }
    document.addEventListener("DOMContentLoaded", function () {
        visNyesteProdukter();
    });
})();