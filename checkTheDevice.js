// check if the device is below iphone 12 or not 
// if it is below iphone 12 then it will display alert message "This website might not work properly on your device"

const checkTheDevice = () => {
    // check if the alert message was ran on the device or not
    if (localStorage.getItem("alertMessage") === null) {
        // check if the device is below iphone 12 or not
        if (window.screen.width < 390) {
            // display alert message
            alert("This website might not work properly on your device");
            // set the alert message to local storage
            localStorage.setItem("alertMessage", "true");
        }
    }
}

