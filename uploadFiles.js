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
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        showSuccessMessage("displaySM");
        clearFormInputs();
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
      // Database deletion successful
      console.log("Successfully deleted database data.");

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


function deleteButton() {
  deleteAll();
  showSuccessMessage("displaySMR");
}

function showSuccessMessage(elementId) {
  document.getElementById(elementId).style.display = "block";
  setTimeout(function () {
    document.getElementById(elementId).style.display = "none";
  }, 3000);
}

function clearFormInputs() {
  document.getElementById("EventTitle").value = "";
  document.getElementById("para").value = "";
  document.getElementById("eventPic").value = "";
}
