async function loadCSV() {
  const response = await fetch('dictionary_data.csv');
  const text = await response.text();
  const lines = text.trim().split('\n').slice(1); // Skip header
  return lines.map(line => {
    const [Word, Meaning, Example] = line.split(',');
    return { Word, Meaning, Example };
  });
}

const tbody = document.getElementById("dictionaryBody");
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", async (e) => {
  const filter = e.target.value.toLowerCase();
  const data = await loadCSV();
  const filtered = data.filter(entry =>
    entry.Word.includes(filter) || entry.Meaning.toLowerCase().includes(filter)
  );

  tbody.innerHTML = "";
  for (const entry of filtered) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.Word}</td><td>${entry.Meaning}</td><td>${entry.Example}</td>`;
    tbody.appendChild(row);
  }
});
