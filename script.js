function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => section.classList.remove("active"));

  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.add("active");
}

document.getElementById("homebtn").addEventListener("click", function () {
  showSection("homeSection");
});

document.getElementById("aboutbtn").addEventListener("click", function () {
  showSection("aboutSection");
});

document.getElementById("explorebtn").addEventListener("click", function () {
  showSection("exploreSection");
});

document.getElementById("bookingbtn").addEventListener("click", function () {
  showSection("bookingSection");
});

document.getElementById("contactbtn").addEventListener("click", function () {
  showSection("homeSection");
});

// --------------------- Slider ------------------
let container1 = document.getElementById("img1");
let container2 = document.getElementById("img2");
container2.style.marginLeft = "80px";

let img1 = document.createElement("img");
img1.style.width = "300px";
img1.style.height = "300px";
img1.style.borderRadius = "10px";
container1.appendChild(img1);

let img2 = document.createElement("img");
img2.style.width = "300px";
img2.style.height = "300px";
img2.style.borderRadius = "10px";
container2.appendChild(img2);

let imageArr = [
  "https://images.unsplash.com/photo-1703593693015-3b5ff2708244?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682686581413-0a0ec9bb35bb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682695795557-17447f921f79?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703607980028-54323dab4040?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

let index = 0;

setInterval(() => {
  if (index >= imageArr.length) {
    index = 0;
  }

  if (index % 2 === 0) {
    img1.src = imageArr[index];
  } else {
    img2.src = imageArr[index];
  }

  index++;
}, 1500);

// ---------------------- Modal -------------------------
document.addEventListener("DOMContentLoaded", function () {
  const openSignUpModalBtn = document.getElementById("signUp");
  const closeSignUpModalBtn = document.getElementById("closeModalBtnSignUp");
  const signUpModal = document.getElementById("signUpModal");

  const openSignInModalBtn = document.getElementById("signIn");
  const closeSignInModalBtn = document.getElementById("closeModalBtnSignIn");
  const signInModal = document.getElementById("signInModal");

  function openModal(modal) {
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  openSignUpModalBtn.addEventListener("click", function () {
    openModal(signUpModal);
  });

  closeSignUpModalBtn.addEventListener("click", function () {
    closeModal(signUpModal);
  });

  openSignInModalBtn.addEventListener("click", function () {
    openModal(signInModal);
  });

  closeSignInModalBtn.addEventListener("click", function () {
    closeModal(signInModal);
  });

  window.addEventListener("click", function (event) {
    if (event.target == signUpModal) {
      closeModal(signUpModal);
    }
    if (event.target == signInModal) {
      closeModal(signInModal);
    }
  });
});

//------------------- fetch And Append data --------------

const travelUrl = `https://korea-api.onrender.com/destination`;
const cardContainer = document.getElementById("card-container");
let destinations = [];

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  let img = document.createElement("img");
  img.className = "cardImage";
  img.src = item.image;
  img.alt = item.name;

  const h2 = document.createElement("h2");
  h2.className = "name";
  h2.innerText = `${item.name},${item.location}`;

  const p = document.createElement("p");
  p.className = "description";
  p.innerText = item.description;

  const price_rating = document.createElement("div");
  price_rating.className = "price_rating";

  const price = document.createElement("p");
  price.className = "price";
  price.innerText = item.price;

  const rating = document.createElement("p");
  rating.className = "rating";
  rating.innerText = item.rating;

  const bookBtn = document.createElement("button");
  bookBtn.dataset.id = item.id;
  bookBtn.innerHTML = "Book Now";
  bookBtn.className = "bookbtn";

  price_rating.append(price, rating);
  card.append(img, h2, p, price_rating, bookBtn);

  return card;
}

async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    destinations = data;
    appendData(destinations);
  } catch (error) {
    console.log(error);
  }
}
fetchData(travelUrl);

function appendData(data) {
  let cardList = document.createElement("div");
  cardList.className = "card-list";

  data.forEach((item) => {
    cardList.appendChild(createCard(item));
  });

  cardContainer.textContent = "";
  cardContainer.append(cardList);
}

// counting ---Yash

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
const tripsCountDisplay = document.getElementById("tripsCount");
const happyCustomersCountDisplay = document.getElementById(
  "happyCustomersCount"
);
const celebrationMessage = document.getElementById("celebrationMessage");

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

// supriya faq
function toggleAnswer(questionId) {
  var answers = document.querySelectorAll(".answer");

  answers.forEach(function (answer) {
    answer.style.display = "none";
  });

  var answer = document.getElementById(questionId);
  answer.style.display = answer.style.display === "block" ? "none" : "block";
}

///HAMBURGER
function onclickMenu() {
  document.getElementById("menu").classList.toggle("icon");
  document.getElementById("nav").classList.toggle("change");
}
