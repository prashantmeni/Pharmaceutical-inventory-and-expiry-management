const apiUrl = "http://localhost:3000/medicines";

async function fetchMedicines() {
  const response = await fetch(apiUrl);
  const medicines = await response.json();
  const container = document.getElementById("medicines");
  container.innerHTML = medicines.map(m => 
    `<div>${m.name} - Qty: ${m.quantity} - Expiry: ${m.expiry}</div>`
  ).join("");
}

fetchMedicines();
