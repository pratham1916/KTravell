// js for the video section -----------
var video = document.querySelector("#desId > video");

video.addEventListener("mouseover", function () {
  video.play();
  video.classList.remove("controls-hidden");
});

video.addEventListener("mouseout", function () {
  video.pause();
  video.classList.add("controls-hidden");
});

// -------------------------------
let tripsCount = 0;
let happyCustomersCount = 0;

// Get DOM elements
const tripsCountDisplay = document.getElementById('tripsCount');
const happyCustomersCountDisplay = document.getElementById('happyCustomersCount');
const celebrationMessage = document.getElementById('celebrationMessage');

// Function to update the Trips count
function startTrips() {
    if (tripsCount < 900) {
        tripsCount++;
        tripsCountDisplay.textContent = tripsCount;
        setTimeout(startTrips, 10); // Update every 10 milliseconds for a smoother animation
    }
}

// Function to update the Happy Customers count
function startHappyCustomers() {
    if (happyCustomersCount < 2500) {
        happyCustomersCount++;
        happyCustomersCountDisplay.textContent = happyCustomersCount;
        setTimeout(startHappyCustomers, 20); // Update every 20 milliseconds for a smoother animation
    } else {
        celebrate(); 
    }
}


startTrips();
startHappyCustomers();
