function SetPlaceholders() {
    document.getElementById("fullName").placeholder = "Full name";
    document.getElementById("age").placeholder = "Your age";
    document.getElementById("emailAdress").placeholder = "Email adress";
    document.getElementById("message").placeholder = "Your message";
}

window.onload = SetPlaceholders()