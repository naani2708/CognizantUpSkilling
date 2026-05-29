let unsavedChanges = false;


function showFee(){

    let event =
    document.getElementById("eventType").value;

    document.getElementById("fee").innerHTML =
    "Selected Event: " + event;

    localStorage.setItem(
        "preferredEvent",
        event
    );
}


window.onload = function(){

    let saved =
    localStorage.getItem(
        "preferredEvent"
    );

    if(saved){

        document.getElementById(
            "eventType"
        ).value = saved;

        showFee();
    }
};


function submitForm(){

    document.getElementById(
        "confirmation"
    ).innerHTML =
    "Registration Successful";

    unsavedChanges = false;
}


function countCharacters(){

    let count =
    document.getElementById(
        "feedback"
    ).value.length;

    document.getElementById(
        "charCount"
    ).innerHTML = count;

    unsavedChanges = true;
}


function enlargeImage(img){

    img.style.width = "300px";
}


function findNearbyEvents(){

    navigator.geolocation.getCurrentPosition(

        function(position){

            document.getElementById(
                "locationResult"
            ).innerHTML =

            "Latitude: " +
            position.coords.latitude +
            "<br>Longitude: " +
            position.coords.longitude;
        },

        function(error){

            document.getElementById(
                "locationResult"
            ).innerHTML = error.message;
        },

        {
            enableHighAccuracy:true,
            timeout:5000
        }
    );
}


function checkUnsaved(){

    if(unsavedChanges){
        return "Unsaved changes exist.";
    }
}