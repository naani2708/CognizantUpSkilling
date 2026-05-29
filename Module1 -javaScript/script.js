
console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
    alert("Community Portal Loaded Successfully");
});


const eventName = "Music Festival";
const eventDate = "2026-06-15";

let availableSeats = 50;

console.log(
    `Event: ${eventName} | Date: ${eventDate} | Seats: ${availableSeats}`
);


class Event {

    constructor(name, category, date, seats) {

        this.name = name;
        this.category = category;
        this.date = date;
        this.seats = seats;
    }
}

Event.prototype.checkAvailability = function () {

    return this.seats > 0;
};


let events = [

    new Event(
        "Music Festival",
        "Music",
        "2026-06-15",
        50
    ),

    new Event(
        "Food Fair",
        "Food",
        "2026-06-20",
        40
    ),

    new Event(
        "Sports Meet",
        "Sports",
        "2026-06-22",
        30
    ),

    new Event(
        "Art Expo",
        "Art",
        "2026-06-25",
        20
    )
];


Object.entries(events[0]).forEach(
    ([key, value]) => {

        console.log(key, value);
    }
);


events.push(
    new Event(
        "Workshop on Baking",
        "Food",
        "2026-07-01",
        25
    )
);


const musicEvents = events.filter(
    event => event.category === "Music"
);

console.log(musicEvents);


const eventTitles = events.map(
    event => `Workshop/Event: ${event.name}`
);

console.log(eventTitles);


function addEvent(
    name,
    category,
    date,
    seats = 10
) {

    events.push(
        new Event(
            name,
            category,
            date,
            seats
        )
    );
}


function registerUser(eventObj) {

    try {

        if (eventObj.seats <= 0) {

            throw new Error(
                "No seats available"
            );
        }

        eventObj.seats--;

        alert(
            `Registered Successfully for ${eventObj.name}`
        );

        renderEvents();

    } catch (error) {

        alert(error.message);
    }
}


function filterEventsByCategory(
    category,
    callback
) {

    const filtered = events.filter(
        event =>
        event.category === category
    );

    callback(filtered);
}


function registrationCounter() {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        console.log(
            "Total Registrations:",
            totalRegistrations
        );
    };
}

const countRegistration =
    registrationCounter();


const eventsContainer =
    document.querySelector("#events");

function renderEvents() {

    const cardArea =
        document.querySelector(
            "#dynamicEvents"
        );

    if (!cardArea) return;

    cardArea.innerHTML = "";

    events.forEach(event => {

        if (
            event.checkAvailability()
        ) {

            const card =
                document.createElement("div");

            card.className =
                "card p-3 m-2";

            card.innerHTML = `

                <h4>${event.name}</h4>

                <p>
                    Category:
                    ${event.category}
                </p>

                <p>
                    Seats:
                    ${event.seats}
                </p>

                <button
                    class="btn btn-primary"
                    onclick="registerUser(events.find(e => e.name === '${event.name}'))">

                    Register

                </button>
            `;

            cardArea.appendChild(card);
        }
    });
}


function submitForm() {

    const form =
        document.getElementById(
            "eventForm"
        );

    const name =
        document.getElementById(
            "name"
        ).value;

    const email =
        document.getElementById(
            "email"
        ).value;

    const selectedEvent =
        document.getElementById(
            "eventType"
        ).value;

    if (
        !name ||
        !email ||
        !selectedEvent
    ) {

        document.getElementById(
            "confirmation"
        ).innerHTML =
            "Please fill all fields";

        return;
    }

    document.getElementById(
        "confirmation"
    ).innerHTML =
        "Registration Successful";

    console.log({
        name,
        email,
        selectedEvent
    });

    simulatePost(
        name,
        email,
        selectedEvent
    );
}


function validatePhone() {

    const phone =
        document.getElementById(
            "phone"
        ).value;

    const regex =
        /^[0-9]{10}$/;

    if (
        phone !== "" &&
        !regex.test(phone)
    ) {

        alert(
            "Enter valid 10-digit number"
        );
    }
}


function showFee() {

    const event =
        document.getElementById(
            "eventType"
        ).value;

    let fee = "";

    if (event === "Music")
        fee = "₹200";

    else if (event === "Sports")
        fee = "₹150";

    else if (event === "Art")
        fee = "₹100";

    document.getElementById(
        "fee"
    ).innerHTML =
        "Event Fee: " + fee;
}


let unsavedChanges = false;

function countCharacters() {

    const text =
        document.getElementById(
            "feedback"
        ).value;

    document.getElementById(
        "charCount"
    ).innerHTML =
        text.length;

    unsavedChanges = true;
}


function enlargeImage(img) {

    img.style.width = "300px";
    img.style.height = "200px";
}


function videoReady() {

    document.getElementById(
        "videoMessage"
    ).innerHTML =
        "Video Ready To Play";
}


function savePreference() {

    const selected =
        document.getElementById(
            "eventType"
        ).value;

    localStorage.setItem(
        "preferredEvent",
        selected
    );
}

window.onload = () => {

    const saved =
        localStorage.getItem(
            "preferredEvent"
        );

    if (saved) {

        document.getElementById(
            "eventType"
        ).value = saved;

        showFee();
    }

    renderEvents();
};


function clearPreferences() {

    localStorage.clear();

    sessionStorage.clear();

    alert(
        "Preferences Cleared"
    );
}


function findNearbyEvents() {

    if (
        navigator.geolocation
    ) {

        navigator.geolocation
            .getCurrentPosition(

                position => {

                    document.getElementById(
                        "locationResult"
                    ).innerHTML =

                        `
                        Latitude:
                        ${position.coords.latitude}
                        <br>
                        Longitude:
                        ${position.coords.longitude}
                        `;
                },

                error => {

                    document.getElementById(
                        "locationResult"
                    ).innerHTML =
                        error.message;
                },

                {
                    enableHighAccuracy: true,
                    timeout: 5000
                }
            );
    }
}


function checkUnsaved() {

    if (unsavedChanges) {

        return "Unsaved Changes Exist";
    }
}


document.addEventListener(
    "keydown",
    event => {

        console.log(
            "Key Pressed:",
            event.key
        );
    }
);


function fetchMockEvents() {

    return new Promise(
        resolve => {

            setTimeout(() => {

                resolve(events);

            }, 1500);
        }
    );
}


fetch(
    "https://jsonplaceholder.typicode.com/posts"
)
.then(response => response.json())
.then(data => {

    console.log(
        "Fetched Events",
        data.slice(0, 5)
    );
})
.catch(error => {

    console.error(error);
});


async function loadEvents() {

    try {

        document.getElementById(
            "loadingSpinner"
        ).style.display =
            "block";

        const result =
            await fetchMockEvents();

        console.log(result);

    } catch (error) {

        console.error(error);

    } finally {

        const spinner =
            document.getElementById(
                "loadingSpinner"
            );

        if (spinner) {

            spinner.style.display =
                "none";
        }
    }
}


function simulatePost(
    name,
    email,
    selectedEvent
) {

    setTimeout(() => {

        fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    selectedEvent
                })
            }
        )
        .then(response =>
            response.json()
        )
        .then(data => {

            console.log(
                "Registration Saved",
                data
            );
        })
        .catch(error => {

            console.error(error);
        });

    }, 2000);
}


$(document).ready(function () {

    $("#registerBtn").click(
        function () {

            $(".eventCard")
                .fadeOut(500)
                .fadeIn(500);
        }
    );
});


console.log(
    "React/Vue make UI management easier using reusable components."
);