// Array of city names and their corresponding time zones
const timeZones = [
  { city: "New York", timeZone: "America/New_York" },
  { city: "London", timeZone: "Europe/London" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
  { city: "Sydney", timeZone: "Australia/Sydney" },
  { city: "Kathmandu", timeZone: "Asia/Kathmandu" },
  { city: "Paris", timeZone: "Europe/Paris" },
  { city: "Dubai", timeZone: "Asia/Dubai" },
  { city: "Mumbai", timeZone: "Asia/Kolkata" },
  { city: "Singapore", timeZone: "Asia/Singapore" },
  { city: "Cape Town", timeZone: "Africa/Johannesburg" },
  { city: "Moscow", timeZone: "Europe/Moscow" },
  { city: "Berlin", timeZone: "Europe/Berlin" }
];

let alarms = []; // Store active alarms
const alarmSound = new Audio("alarm.wav"); // Alarm sound

// Get the current time for a specific time zone
function getCurrentTime(timeZone) {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    timeZone,
    hour12: false // Use 24-hour format
  });
}

// Update the clock display for all cities
function updateClocks() {
  const clocksContainer = document.getElementById("clocks");
  clocksContainer.innerHTML = ""; // Clear existing clocks

  timeZones.forEach(({ city, timeZone }) => {
    const clockDiv = document.createElement("div");
    clockDiv.className = "col-md-4 col-sm-6";

    const card = document.createElement("div");
    card.className = "card text-center p-3";

    const cityElement = document.createElement("h5");
    cityElement.className = "card-title";
    cityElement.textContent = city;

    const timeElement = document.createElement("p");
    timeElement.className = "card-text";
    timeElement.textContent = getCurrentTime(timeZone);

    card.appendChild(cityElement);
    card.appendChild(timeElement);
    clockDiv.appendChild(card);
    clocksContainer.appendChild(clockDiv);
  });

  checkAlarms(); // Check for triggered alarms
}

// Add a new alarm
function setAlarm() {
  const city = document.getElementById("alarmCity").value;
  const time = document.getElementById("alarmTime").value;

  if (city && time) {
    alarms.push({ city, time });
    alert(`Alarm set for ${city} at ${time}`);
  } else {
    alert("Please select a city and time for the alarm!");
  }
}

// Check and trigger alarms
function checkAlarms() {
  alarms.forEach((alarm, index) => {
    const { city, time } = alarm;
    const currentTime = getCurrentTime(
      timeZones.find((tz) => tz.city === city).timeZone
    );

    if (currentTime.startsWith(time)) {
      alarmSound.play();
      setTimeout(() => {
        alert(`Alarm! It's ${time} in ${city}`);
      }, 100); 

      alarms.splice(index, 1);
    }
  });
}


// Update clocks every second
setInterval(updateClocks, 1000);
