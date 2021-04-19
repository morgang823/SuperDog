//Create the array 
//information taken from SuperDog

let eventBookArray = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017"
}, {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018"
}, {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019"
}, {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017"
}, {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018"
}, {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019"
}, {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017"
}, {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018"
}, {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019"
}];
//Load the Array

var filteredEvents = eventBookArray;

function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(eventBookArray.map((event) => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;

    }
    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayStats();
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }
    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventBookArray")) || eventBookArray
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Event`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }

        });
    }

    displayStats();
}

loadeventBook();

//Create Function for load eventBook Array
function loadeventBook() {
    let eventBook = [];
    eventBook = getData();
    displayData(eventBook);
}

function getData() {
    let eventBook = JSON.parse(localStorage.getItem("eventBookArray")) || [];
    if (eventBook.length == 0) {
        eventBook = eventBookArray;
        localStorage.setItem("eventBookArray", JSON.stringify(eventBook));
    }
    return eventBook;
}
// Save data function
function saveData() {
    //Grab local events form storage
    let eventBook = JSON.parse(localStorage.getItem("eventBookArray")) || eventBook;
    //create an object

    let obj = {};
    obj["event"] = document.getElementById("newEvent").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = +document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;

    eventBook.push(obj);

    localStorage.setItem("eventBookArray", JSON.stringify(eventBook));

    displayData(eventBook);

}
// Display Data function]
function displayData(eventBook) {
    const template = document.getElementById("Data-Template");
    const resultsBody = document.getElementById("resultsBody");
    resultsBody.innerHTML = "";

    for (let i = 0; i < eventBook.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("eventName").textContent = eventBook[i].event;
        dataRow.getElementById("eventCity").textContent = eventBook[i].city;
        dataRow.getElementById("eventState").textContent = eventBook[i].state;
        dataRow.getElementById("eventAttendance").textContent = eventBook[i].attendance.toLocaleString();
        dataRow.getElementById("eventDate").textContent = eventBook[i].date;
        resultsBody.appendChild(dataRow);
    }

}