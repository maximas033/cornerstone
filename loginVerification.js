// WHEN THE LOGIN BUTTON IS CLICKED ON THE LOGIN PAGE */
function login(event){
    event.preventDefault()
    var email = document.getElementById('emailField').value
    var password = document.getElementById('passwordField').value
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        //HANDELING ERRORS
        var errorCode = error.code;
        console.log("Error signing in,",  error.message)
        document.getElementById("errorMessage").style.display = "block"
        document.getElementById("messageError").innerHTML = error.message
        setTimeout(function(){
            document.getElementById("errorMessage").style.display = "none"
        }, 3000);

    }).then(function(user){
        //IF THE USER IS LOGGED IN
        if(user != null){
            console.log("User is logged in")
            // get all information from the users database
            var ref = firebase.database().ref("users");
            // loop throught the data  
            // if the users email matches with the database emaul
            // then get the isADMIN value
            ref.on("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    if(childData.email == email){
                        console.log(childData.isADMIN)
                        // if the user is an admin then redirect to the admin page
                        if(childData.isADMIN == "yes" || childData.isADMIN == "Yes"){
                            window.location.href = "editpage.html"
                        }else{
                            window.location.href = "isAuthorizedWorker.html"
                        }
                    }
                });
            }
            , function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            }
            );
        }
    })
}




//WHEN LOG OUT BUTTON IS PRESSED...
function logOut(){
    firebase.auth().signOut().then(function(){
        // SIGN-OUT SUCCESSFULL
        window.location = "index.html"
    }).catch(function(error){
        //AN ERROR HAPPENED SIGNING OUT
    });
}
