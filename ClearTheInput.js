function ClearFormInputs() {
    document.getElementById("fullName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("emailAddress").value = "";
    document.getElementById("message").value = "";
}

function SetPlaceholders() {
    document.getElementById("fullName").placeholder = "Full name";
    document.getElementById("age").placeholder = "Your age";
    document.getElementById("emailAddress").placeholder = "Email address";
    document.getElementById("message").placeholder = "Your message";
}

function InitializeForm() {
    SetPlaceholders();
    ClearFormInputs();
}

window.addEventListener("load", InitializeForm);
