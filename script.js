
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQuO2uIzDXRp4LsboDnNcVKBY-w9fhr7NcM6w3wpR0sbf9sMe5yzPNjZup0xnfuu5JAIrPvDGeAsnBh/pub?output=csv";

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const rows = data.split("\n").slice(1);
    const container = document.getElementById("jobs");
    rows.forEach(row => {
      const cols = row.split(",");
      if (cols.length >= 5) {
        const html = `
          <div class="job-card">
            <h3>${cols[0]}</h3>
            <p>${cols[1]}</p>
            <p>📅 ${cols[2]}</p>
            <p>📄 ${cols[3]}</p>
            <p>📍 ${cols[4]}</p>
            <a href="${cols[5]}" target="_blank"><button class="apply-btn">APPLY</button></a>
          </div>`;
        container.innerHTML += html;
      }
    });
  });
