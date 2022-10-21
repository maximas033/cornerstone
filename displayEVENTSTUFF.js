function getANDdisplay(){
// get the information from the data base
    firebase.database().ref('eventsNow').on('value', function(snapshot){
        // get the eventsNow from the database
        var eventsNow = snapshot.val()
        // ge the event title and description from eventsNow
        var eventTitle = eventsNow.eventTitle
        var eventDescription = eventsNow.eventDescription
        // display the event title and description
        document.getElementById('displayEventTitle').innerHTML = eventTitle
        document.getElementById('displayEventTEXT').innerHTML = eventDescription
        }
    )

    // get the lates uploaded image from the storage 
    var storageRef = firebase.storage().ref()
    storageRef.child('eventImages/').listAll().then(function(result){
        result.items.forEach(function(imageRef){
            imageRef.getDownloadURL().then(function(url){
                //create image element
                var img = document.createElement('img')
                // set the image source
                img.src = url
                // set the image width
                img.width = 300
                // set the image height
                img.height = 300
                // append the image to the div
                document.getElementById('displayEventImage').appendChild(img)
            })
        })
    }
    )

    // if database is empty, joinOurTeam margin-top will be -10%
    firebase.database().ref('eventsNow').on('value', function(snapshot){
        if(snapshot.val() == null){
            document.getElementById('joinOurTeam').style.marginTop = "-20%"
        }
    }
    )
}


