function search() {

    var value = document.getElementById("searchValue").value;
    window.location.assign("produkter.html?find=" + value);
}

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    search();
});

