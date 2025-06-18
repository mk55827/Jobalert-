
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuO2uIzDXRp4LsboDnNcVKBY-w9fhr7NcM6w3wpR0sbf9sMe5yzPNjZup0xnfuu5JAIrPvDGeAsnBh/pub?output=csv';

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const rows = data.trim().split('\n').slice(1);
    const jobsContainer = document.getElementById('jobs');
    rows.forEach(row => {
      const [title, company, date, type, location, link] = row.split(',');
      const card = document.createElement('div');
      card.className = 'job-card';
      card.innerHTML = `
        <h3>${title}</h3>
        <p>${company}</p>
        <p>📅 ${date}</p>
        <p>🗂️ ${type}</p>
        <p>📍 ${location}</p>
        <a href="${link}" target="_blank"><button class="apply-btn">APPLY</button></a>
      `;
      jobsContainer.appendChild(card);
    });
  });

function filterJobs() {
  const input = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".job-card");
  cards.forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(input) ? "block" : "none";
  });
}
