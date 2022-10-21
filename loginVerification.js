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
        // if(user){
        //     window.location = "isAutherizedWorker.html"
        //     // document.getElementById("gName").innerHTML = user
        // }
        // else{

        // }
        if(user != null && email === "max.personal9@gmail.com"){
            window.location = "editpage.html"
        }
        else if(user != null){
            window.location = "isAutherizedWorker.html"
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
