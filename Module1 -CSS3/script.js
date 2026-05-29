let unsavedChanges = false;


function validatePhone(){

    let phone =
    document.getElementById("phone").value;

    if(phone !== "" &&
       !/^[0-9]{10}$/.test(phone))
    {
        alert("Enter a valid 10-digit phone number");
    }
}


function showFee(){

    let event =
    document.getElementById("eventType").value;

    let fee = "";

    if(event === "Music"){
        fee = "₹200";
    }
    else if(event === "Sports"){
        fee = "₹150";
    }
    else if(event === "Art"){
        fee = "₹100";
    }

    document.getElementById("fee").innerHTML =
    "Event Fee: " + fee;
}


function submitForm(){

    document.getElementById("confirmation")
    .innerHTML =
    "Registration Successful!";

    unsavedChanges = false;
}


function enlargeImage(img){

    img.style.width = "300px";
}


function countCharacters(){

    let count =
    document.getElementById("feedback").value.length;

    document.getElementById("charCount")
    .innerHTML = count;

    unsavedChanges = true;
}

function videoReady(){

    document.getElementById("videoMessage")
    .innerHTML =
    "Video Ready To Play";
}

function savePreference(){

    let selected =
    document.getElementById("eventType").value;

    localStorage.setItem(
        "preferredEvent",
        selected
    );
}
window.onload = function(){

    let saved =
    localStorage.getItem("preferredEvent");

    if(saved){

        document.getElementById("eventType")
        .value = saved;

        showFee();
    }
};
function clearPreferences(){

    localStorage.clear();
    sessionStorage.clear();

    alert("Preferences Cleared");
}


function findNearbyEvents(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError,
            {
                enableHighAccuracy:true,
                timeout:5000
            }
        );
    }
}

function showPosition(position){

    document.getElementById("locationResult")
    .innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

function showError(error){

    document.getElementById("locationResult")
    .innerHTML =
    "Error: " + error.message;
}


function checkUnsaved(){

    if(unsavedChanges){
        return "You have unsaved changes.";
    }
}