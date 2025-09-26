document.addEventListener("DOMContentLoaded", () => {
  // ===== Highlight active nav link =====
  const navLinks = document.querySelectorAll("nav .nav-links a");
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ===== Hamburger menu toggle =====
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      hamburger.classList.toggle("active");
    });
  }

  // ===== Fade-in section on scroll =====
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));

  // ===== Project hover effect =====
  const projects = document.querySelectorAll(".project");
  projects.forEach(proj => {
    proj.addEventListener("mouseenter", () => {
      proj.style.transform = "translateY(-8px)";
      proj.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
      proj.style.transition = "all 0.3s ease";
    });
    proj.addEventListener("mouseleave", () => {
      proj.style.transform = "translateY(0)";
      proj.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    });
  });

  // ===== FORM VALIDATION (Message Us) =====
  const form = document.querySelector("form");
  const displayBox = document.querySelector(".display-box");

  if (form) {
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Tombol animasi
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.transform = "scale(0.95)";
      }

      // Ambil nilai input
      const nama = form.querySelector("input[type='text']")?.value.trim() || "";
      const email = form.querySelector("input[type='email']")?.value.trim() || "";
      const telepon = form.querySelector("input[type='tel']")?.value.trim() || "";
      const tanggal = form.querySelector("input[type='date']")?.value || "";
      const genderInput = form.querySelector("input[name='gender']:checked");
      const topik = form.querySelector("select")?.value || "";
      const pesan = form.querySelector("textarea")?.value.trim() || "";

      // Validasi kosong
      if (!nama || !email || !telepon || !tanggal || !genderInput || !topik || !pesan) {
        Swal.fire("Oops!", "Harap lengkapi semua field!", "error");
        return resetBtn();
      }

      // Validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire("Oops!", "Email tidak valid!", "error");
        return resetBtn();
      }

      // Validasi nomor telepon
      if (!/^[0-9]+$/.test(telepon) || telepon.length < 10 || telepon.length > 13) {
        Swal.fire("Oops!", "Nomor telepon harus 10-13 digit angka!", "error");
        return resetBtn();
      }

      // Validasi tanggal lahir
      const tglObj = new Date(tanggal);
      if (isNaN(tglObj.getTime()) || tglObj > new Date()) {
        Swal.fire("Oops!", "Tanggal lahir tidak valid!", "error");
        return resetBtn();
      }

      // ===== Output Data =====
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
        <h3>📌 Data Terkirim</h3>
        <p><strong>Waktu:</strong> ${esc(currentTime)}</p>
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
        setTimeout(() => {
          displayBox.style.transition = "opacity 0.5s ease";
          displayBox.style.opacity = 1;
        }, 100);
      }

      // SweetAlert sukses
      Swal.fire("Sukses!", "Form berhasil dikirim!", "success");

      // Reset form
      form.reset();
      setTimeout(() => resetBtn(), 800);
    });

    function resetBtn() {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.transform = "scale(1)";
      }
    }
  }
});
