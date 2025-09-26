// js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link otomatis
  const navLinks = document.querySelectorAll("nav .nav-links a");
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Animasi fade-in untuk section
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));

  // FORM VALIDATION (khusus contact.html)
  const form = document.querySelector("form");
  const displayBox = document.querySelector(".display-box");

  if (form) {
    // Alert box
    const alertBox = document.createElement("div");
    alertBox.className = "alert";
    alertBox.setAttribute("role", "alert");
    alertBox.style.display = "none";
    form.prepend(alertBox);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      const nama = form.querySelector("input[type='text']")?.value.trim() || "";
      const email = form.querySelector("input[type='email']")?.value.trim() || "";
      const telepon = form.querySelector("input[type='tel']")?.value.trim() || "";
      const tanggal = form.querySelector("input[type='date']")?.value || "";
      const genderInput = form.querySelector("input[name='gender']:checked");
      const topik = form.querySelector("select")?.value || "";
      const pesan = form.querySelector("textarea")?.value.trim() || "";

      // Validasi
      if (!nama || !email || !telepon || !tanggal || !genderInput || !topik || !pesan) {
        showAlert("✖ Harap lengkapi semua field!", "error");
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAlert("✖ Email tidak valid!", "error");
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      if (!/^[0-9]+$/.test(telepon) || telepon.length < 10 || telepon.length > 13) {
        showAlert("✖ Nomor telepon harus 10-13 digit angka!", "error");
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      const tglObj = new Date(tanggal);
      if (isNaN(tglObj.getTime()) || tglObj > new Date()) {
        showAlert("✖ Tanggal lahir tidak valid!", "error");
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      // Output data
      const gender = genderInput.value;
      const tanggalFormatted = tglObj.toLocaleDateString("id-ID", {
        day: "2-digit", month: "long", year: "numeric"
      });
      const currentTime = new Date().toLocaleString("id-ID");

      const esc = (s) => String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

      const outHtml = `
        <p><strong>Current time:</strong> ${esc(currentTime)}</p>
        <p><strong>Nama:</strong> ${esc(nama)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>No. Telepon:</strong> ${esc(telepon)}</p>
        <p><strong>Tanggal Lahir:</strong> ${esc(tanggalFormatted)}</p>
        <p><strong>Jenis Kelamin:</strong> ${esc(gender)}</p>
        <p><strong>Topik:</strong> ${esc(topik)}</p>
        <p><strong>Pesan:</strong> ${esc(pesan)}</p>
      `;

      if (displayBox) {
        displayBox.innerHTML = outHtml;
        displayBox.style.opacity = 0;
        setTimeout(() => { displayBox.style.opacity = 1; }, 50);
      }

      showAlert("✔ Form berhasil dikirim!", "success");
      form.reset();

      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
      }, 500);
    });

    // Fungsi Alert
    function showAlert(message, type = "success") {
      alertBox.textContent = message;
      alertBox.classList.remove("success", "error");
      alertBox.classList.add(type);
      alertBox.style.display = "block";
      alertBox.focus?.();

      if (alertBox._timeout) clearTimeout(alertBox._timeout);
      alertBox._timeout = setTimeout(() => {
        alertBox.style.display = "none";
      }, 3000);
    }
  }
});
