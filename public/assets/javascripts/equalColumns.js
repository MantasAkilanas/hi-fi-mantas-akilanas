var equalColumns = function () {
    var columns = document.getElementsByClassName("equalImage");

    var lenght = columns.length;
    var height = 0;

    for (var i = 0; i < lenght; i++) {
        columns[i].style.height = "auto";
    }
    for (var i = 0; i < lenght; i++) {
        if (columns[i].clientHeight > height) {
            height = columns[i].clientHeight;

        }
    }
    for (var i = 0; i < lenght; i++) {
        columns[i].style.height = height + "px";
    }
}
equalColumns();
window.addEventListener("resize", equalColumns, true)();