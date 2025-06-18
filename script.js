
document.addEventListener("DOMContentLoaded", function () {
  const jobList = document.getElementById("job-list");
  const searchInput = document.getElementById("searchInput");

  fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQuO2uIzDXRp4LsboDnNcVKBY-w9fhr7NcM6w3wpR0sbf9sMe5yzPNjZup0xnfuu5JAIrPvDGeAsnBh/pub?output=csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.trim().split("\n").slice(1);
      const jobs = rows.map((row) => {
        const [title, link] = row.split(",");
        return { title, link };
      });

      function renderJobs(filter = "") {
        jobList.innerHTML = "";
        const filtered = jobs.filter((job) => job.title.toLowerCase().includes(filter.toLowerCase()));
        filtered.forEach((job) => {
          const div = document.createElement("div");
          div.className = "job";
          div.innerHTML = `<h3>${job.title}</h3><a href="${job.link}" target="_blank">Apply</a>`;
          jobList.appendChild(div);
        });
      }

      renderJobs();

      searchInput.addEventListener("input", () => {
        renderJobs(searchInput.value);
      });
    });
});
