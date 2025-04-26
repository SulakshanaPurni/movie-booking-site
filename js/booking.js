function updateSummary() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const tableBody = document.querySelector('#summaryTable tbody');
    tableBody.innerHTML = "";
    let total = 0;
  
    inputs.forEach(input => {
      const qty = parseInt(input.value);
      const price = parseInt(input.dataset.price);
      if (qty > 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${input.name.replace('_', ' ')}</td><td>${qty}</td><td>Rs. ${qty * price}</td>`;
        tableBody.appendChild(row);
        total += qty * price;
      }
    });
  
    document.getElementById("totalCost").innerText = `Rs. ${total}`;
  }
  
  function proceedToCheckout() {
    updateSummary(); // Ensure it's fresh
    localStorage.setItem("cart", document.querySelector('#summaryTable tbody').innerHTML);
    localStorage.setItem("total", document.getElementById("totalCost").innerText);
    window.location.href = "checkout.html";
  }
  
  function saveFavourite() {
    const inputs = document.querySelectorAll('input[type="number"]');
    let favData = {};
    inputs.forEach(input => favData[input.name] = input.value);
    localStorage.setItem("favouriteBooking", JSON.stringify(favData));
    alert("Favourite booking saved!");
  }
  
  function applyFavourite() {
    const fav = JSON.parse(localStorage.getItem("favouriteBooking"));
    if (!fav) return alert("No favourite booking saved.");
    Object.keys(fav).forEach(name => {
      const input = document.querySelector(`input[name="${name}"]`);
      if (input) input.value = fav[name];
    });
    updateSummary();
  }
  