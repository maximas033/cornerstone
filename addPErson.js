// create user with the firebase database
// get the value from emailCreate and passwordCreate
// create user with email and password
// if the user is created, then add the user to the database
// if the user is not created, then show the error
function addPerson(event) {
    event.preventDefault();
    var email = document.getElementById("emailCreate").value;
    var password = document.getElementById("passwordCreate").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        var email = user.email;
        var ref = firebase.database().ref("users/" + uid);
        ref.set({
            email: email,
            dateCreate: new Date().toLocaleString()
            
        });
        // clear the form
        document.getElementById("emailCreate").value = "";
        document.getElementById("passwordCreate").value = "";
       document.getElementById("alerts").innerHTML = "User created successfully";
       document.getElementById("alerts").style.color = "green";
       setTimeout(function() {
        document.getElementById("alerts").innerHTML = "";
    }, 3000);
    }
    ).catch(function(error) {
        document.getElementById("emailCreate").value = "";
        document.getElementById("passwordCreate").value = "";
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("alerts").innerHTML = errorMessage;
        document.getElementById("alerts").style.color = "red";
        // do not show the error afer 3 seconds
        setTimeout(function() {
            document.getElementById("alerts").innerHTML = "";
        }, 3000);
    }
    );
}

