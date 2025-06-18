
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQuO2uIzDXRp4LsboDnNcVKBY-w9fhr7NcM6w3wpR0sbf9sMe5yzPNjZup0xnfuu5JAIrPvDGeAsnBh/pub?output=csv";
const jobsContainer = document.getElementById("jobs-container");
const searchInput = document.getElementById("search");

function loadJobs() {
  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
      const rows = data.split("\n").slice(1);
      jobsContainer.innerHTML = "";
      rows.forEach(row => {
        const [title, company, date, type, location] = row.split(",");
        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
          <h3>${title}</h3>
          <p>${company}</p>
          <p>📅 ${date}</p>
          <p>💼 ${type}</p>
          <p>📍 ${location}</p>
          <button>APPLY</button>
        `;
        jobsContainer.appendChild(card);
      });
    });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".job-card");
  cards.forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
});

window.onload = loadJobs;
