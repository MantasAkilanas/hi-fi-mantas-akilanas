(() => {
    if (localStorage.getItem('token') != null && localStorage.getItem('userid') != null) {
        document.querySelector("#logud").style.display = "block";
        document.querySelector("#navDropdown").style.display = "block";
        document.querySelector("#logind").style.display = "none";
        document.querySelector("#logud").addEventListener("click", () => {
            localStorage.removeItem("userid");
            localStorage.removeItem("token");
            location.reload();

        })
    }
})();