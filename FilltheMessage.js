function FillTheMessageBar() {
    var fullName = document.getElementById("fullName").value;
    // check if the fullName is empty
    if (fullName.trim() !== "") {
        document.getElementById("message").innerHTML = `Hello Cornerstone, my name is ${fullName}. I would love to join your Cornerstone team!`;
    }
}

function initialize() {
    document.getElementById("fullName").addEventListener("input", FillTheMessageBar);
    window.addEventListener("load", FillTheMessageBar);
}

initialize();
setInterval(FillTheMessageBar, 100);
