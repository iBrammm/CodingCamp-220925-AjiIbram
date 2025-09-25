// Greeting di halaman utama
const greeting = document.getElementById("greeting");
if (greeting) {
  const name = prompt("Masukkan nama Anda:");
  greeting.textContent = `Hi, ${name}`;
}

// Validasi dan output form
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {
      alert("Semua field harus diisi!");
      return;
    }

    const output = document.getElementById("output");
    output.innerHTML = `
      <h3>Data Terkirim:</h3>
      <p><strong>Nama:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>No HP:</strong> ${phone}</p>
      <p><strong>Pesan:</strong> ${message}</p>
    `;
  });
}