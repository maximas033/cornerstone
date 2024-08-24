function checkEventsNowOnPageLoad() {
    var eventsNowRef = firebase.database().ref("eventsNow");
  
    eventsNowRef.once("value").then(function (snapshot) {
      var eventData = snapshot.val();
  
      if (eventData) {
        document.getElementById("DeleteEvent").style.display = "block" 
        // Log the entire eventData object
        console.log("Events Now Data:", eventData);
  
        // You can access specific properties and log them individually as well
        var eventTitle = eventData.eventTitle;
        var eventDescription = eventData.eventDescription;
  
        console.log("Event Title:", eventTitle);
        console.log("Event Description:", eventDescription);
  
        // For example, if you want to display the event information on the page:
        var eventTitleElement = document.getElementById("EventTitle");
        var eventDescriptionElement = document.getElementById("para");
  
        if (eventTitleElement && eventDescriptionElement) {
          eventTitleElement.value = eventTitle;
          eventDescriptionElement.value = eventDescription;
        }
      } else {
        console.log("No data in 'eventsNow'");
        document.getElementById("DeleteEvent").style.display = "none" 
         }
    });
  }
  
  // Call the checkEventsNowOnPageLoad function when the page loads
  window.onload = checkEventsNowOnPageLoad;
  