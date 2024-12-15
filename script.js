// HTML element references
const eventNameInput = document.getElementById("event-name");
const eventDateInput = document.getElementById("event-date");
const addEventButton = document.getElementById("add-event");
const countdownList = document.getElementById("countdown-list");
const themeToggleButton = document.getElementById("theme-toggle");

// Array to store events
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to save events to localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

// Function to render all countdowns
function renderCountdowns() {
  countdownList.innerHTML = ""; // Clear previous content

  events.forEach((event, index) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const difference = eventDate - now;

    // Create a countdown item
    const countdownItem = document.createElement("div");
    countdownItem.classList.add("countdown-item");

    if (difference <= 0) {
      countdownItem.innerHTML = `<strong>${event.name}</strong>: The event has arrived! 🎉`;
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      countdownItem.innerHTML = `<strong>${event.name}</strong>: ${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Refresh the countdown every second
      setTimeout(renderCountdowns, 1000);
    }

    // Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      events.splice(index, 1);
      saveEvents();
      renderCountdowns();
    };
    countdownItem.appendChild(deleteButton);

    countdownList.appendChild(countdownItem);
  });
}

// Function to add a new event
function addEvent() {
  const eventName = eventNameInput.value;
  const eventDate = eventDateInput.value;

  if (!eventName || !eventDate) {
    alert("Please enter both an event name and a date!");
    return;
  }

  events.push({ name: eventName, date: eventDate });
  saveEvents();
  renderCountdowns();

  // Clear inputs
  eventNameInput.value = "";
  eventDateInput.value = "";
}

// Toggle between light and dark mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  themeToggleButton.textContent = document.body.classList.contains("dark-mode")
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
}

// Event listeners
addEventButton.addEventListener("click", addEvent);
themeToggleButton.addEventListener("click", toggleTheme);

// Initial render
renderCountdowns();
