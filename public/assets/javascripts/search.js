document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    var value = document.getElementById("searchValue").value;
    window.location.assign("produkter.html?find=" + value);
});

