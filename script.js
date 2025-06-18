
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQuO2uIzDXRp4LsboDnNcVKBY-w9fhr7NcM6w3wpR0sbf9sMe5yzPNjZup0xnfuu5JAIrPvDGeAsnBh/pub?output=csv";

async function fetchJobs() {
  const res = await fetch(sheetUrl);
  const data = await res.text();
  const rows = data.split("\n").slice(1);
  const jobs = rows.map(row => {
    const [title, company, date, type, location, link] = row.split(",");
    return { title, company, date, type, location, link };
  });

  displayJobs(jobs);

  document.getElementById("search").addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = jobs.filter(job => job.title.toLowerCase().includes(value));
    displayJobs(filtered);
  });
}

function displayJobs(jobs) {
  const container = document.getElementById("jobs-container");
  container.innerHTML = "";
  jobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>📅 ${job.date}</p>
        <p>📄 ${job.type}</p>
        <p>📍 ${job.location}</p>
        <a href="${job.link}" target="_blank"><button>Apply</button></a>
      </div>
    `;
  });
}

fetchJobs();
