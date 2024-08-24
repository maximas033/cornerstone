function uploadFiles(event) {
  event.preventDefault();
  deleteAll();

  var eventTitle = document.getElementById("EventTitle").value;
  var eventDescription = document.getElementById("para").value;

  firebase.database().ref("eventsNow").set({
    eventTitle: eventTitle,
    eventDescription: eventDescription,
  });

  var file = document.getElementById("eventPic").files[0];
  var imageName = file.name;

  var storageRef = firebase.storage().ref("eventImages/" + imageName);

  var uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("displaySM").style.display = "block"
      document.getElementById("successMessage").innerHTML = "Upload is " + progress + "% done"
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        document.getElementById("successMessage").innerHTML = "Successfully uploaded"
        clearFormInputs();
        // wait 5 seconds and then hide it
        setTimeout(function(){
          document.getElementById("displaySM").style.display = "none"
          document.getElementById("successMessage").innerHTML = " "
          }, 5000);
      }
    },
    function (error) {
      console.error(error.message);
    },
    function () {
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          console.log("File available at", downloadURL);
          var eventName = document.getElementById("eventName").value;
          var eventLocation = document.getElementById("eventLocation").value;
          var eventDate = document.getElementById("eventDate").value;
          var eventTime = document.getElementById("eventTime").value;
          var eventDescription =
            document.getElementById("eventDescription").value;

          var databaseRef = firebase.database().ref("events");

          var newEvent = databaseRef.push();
          newEvent.set({
            eventName: eventName,
            eventLocation: eventLocation,
            eventDate: eventDate,
            eventTime: eventTime,
            eventDescription: eventDescription,
            eventImage: downloadURL,
          });
        })
        .catch(function (error) {
          console.error("Error getting download URL:", error);
        });
    }
  );
}

function deleteAll() {
  // Database reference
  var dbRef = firebase.database().ref("eventsNow");

  // Storage reference
  var storageRef = firebase.storage().ref();

  // Delete database data
  dbRef.remove()
    .then(function () {

      document.getElementById('displaySM').style.display = "block"
      document.getElementById("successMessage").innerHTML = "Event successfully deleted"
      // wait 5 seconds then hide
      setTimeout(function(){
        document.getElementById('displaySM').style.display = "none"
        document.getElementById("successMessage").innerHTML = " "
      }, 5000);

      // Delete storage data
      storageRef
        .child("eventImages/")
        .listAll()
        .then(function (result) {
          // If no items in the list, log success
          if (result.items.length === 0) {
            console.log("Successfully deleted all images.");
          }

          // Counter for deleted images
          let deleteCounter = 0;

          result.items.forEach(function (imageRef) {
            imageRef.delete().then(function () {
              // Increase counter when image deletion successful
              deleteCounter++;

              // When all images deleted, log success
              if (deleteCounter === result.items.length) {
                document.getElementById('displaySMR').style.display = "block"
                document.getElementById("successMessage").innerHTML = "Successfully deleted"
                // wait 5 seconds then hide
                setTimeout(function(){
                  document.getElementById('displaySMR').style.display = "none"
                  document.getElementById("successMessage").innerHTML = " "
                }, 5000);
              }
            });
          });
        })
        .catch(function (error) {
          console.error("Error deleting images:", error);
          document.getElementById("errorDeleting").style.display = "block"
          document.getElementById("errorDeleting").innerHTML = "Error deleteing event"
        });
    })
    .catch(function (error) {
      console.error("Error deleting database data:", error);
    });
}

function clearFormInputs() {
  document.getElementById("EventTitle").value = "";
  document.getElementById("para").value = "";
  document.getElementById("eventPic").value = "";
}
