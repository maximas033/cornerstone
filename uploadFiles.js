// get all inputs from the editPage form and upload them to the firebase storage
function uploadFiles(event){ 
    event.preventDefault()
    deleteAll()
    // get the event title 
    var eventTitle = document.getElementById('EventTitle').value
    // get the event description
    var eventDescription = document.getElementById('para').value

    // upload the evnet title and description to the firebase database
    firebase.database().ref('eventsNow').set({
        eventTitle: eventTitle,
        eventDescription: eventDescription
    })
    // select the file from the input
    var file = document.getElementById("eventPic").files[0]
    var imageName = file.name;
    // create a storage ref
    var storageRef = firebase.storage().ref('eventImages/' + imageName);
    // upload file to the selected storage ref
    var uploadTask = storageRef.put(file);
    // update the progress bar
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // when progress is 100% display the success message
        if(progress == 100){
            document.getElementById('displaySM').style.display = "block"
            // clear the inputs from the form
            document.getElementById('EventTitle').value = ""
            document.getElementById('para').value = ""
            document.getElementById('eventPic').value = ""
        }
        // do not show the success message after 5 seconds
        setTimeout(function(){
            document.getElementById('displaySM').style.display = "none"
        }
        , 5000)
    }
    , function(error){
        // error function
        console.log(error.message)
    }
    , function(){
        // complete function
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log("File available at", downloadURL)
            // get the values from the form
            var eventName = document.getElementById("eventName").value
            var eventLocation = document.getElementById("eventLocation").value
            var eventDate = document.getElementById("eventDate").value
            var eventTime = document.getElementById("eventTime").value
            var eventDescription = document.getElementById("eventDescription").value
            // create a database ref
            var databaseRef = firebase.database().ref("events")
            // push the data to the database and then display success message
            var newEvent = databaseRef.push()
            newEvent.set({
                eventName: eventName,
                eventLocation: eventLocation,
                eventDate: eventDate,
                eventTime: eventTime,
                eventDescription: eventDescription,
                eventImage: downloadURL
            })
        })
    }
    )
}





// delete everything from the database 
function deleteAll(){
    firebase.database().ref('eventsNow').remove()
   // delete eventImage from storage
    var storageRef = firebase.storage().ref()
    storageRef.child('eventImages/').listAll().then(function(result){
        result.items.forEach(function(imageRef){
            imageRef.delete()
        })
    }
    )
}


function DELETEBUTTON(){
    firebase.database().ref('eventsNow').remove()
    // delete eventImage from storage
     var storageRef = firebase.storage().ref()
     storageRef.child('eventImages/').listAll().then(function(result){
         result.items.forEach(function(imageRef){
             imageRef.delete()
         })
     }
     )

    // show the success message
    document.getElementById('displaySMR').style.display = "block"
    // do not show the success message after 5 seconds
    setTimeout(function(){
        document.getElementById('displaySMR').style.display = "none"
    }
    , 3000)
}
