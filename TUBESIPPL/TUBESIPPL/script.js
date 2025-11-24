// script.js
document.addEventListener("DOMContentLoaded", function () {
  // ========================================================
  // INISIALISASI VARIABEL DAN ELEMENT
  // ========================================================
  const logoBtn = document.getElementById("logoBtn");
  const body = document.body;
  const landing = document.getElementById("landing");

  // Variabel untuk Transisi
  const heroSection = document.getElementById("hero");
  const exploreSection = document.getElementById("explorePage"); // Pastikan ini adalah ID untuk kontainer Explore Culture
  const exploreButton = document.querySelector(".btn-explore");
  const navbarElement = document.querySelector(".site-header");

  // ========================================================
  // PENTING: HIDE ELEMENTS DI AWAL LOADING
  // ========================================================

  // 1. Hero Section disembunyikan di awal (Tampil setelah logoBtn diklik)
  if (heroSection) {
    heroSection.style.display = "none";
  }

  // 2. Explore Section disembunyikan di awal (Tampil setelah exploreButton diklik)
  if (exploreSection) {
    exploreSection.style.display = "none";
    exploreSection.style.opacity = "0";
    exploreSection.style.transform = "translateY(20px)";
    exploreSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    console.log("✅ Explore section is hidden at start.");
  } else {
    console.error("❌ Explore section not found! Check HTML ID: explorePage");
  }

  // ========================================================
  // LANDING PAGE TO HERO TRANSITION (Circle Click Handler)
  // ========================================================
  logoBtn.addEventListener("click", function () {
    body.classList.add("entering");
    setTimeout(() => {
      if (landing) landing.style.display = "none"; // Sembunyikan Landing
      if (heroSection) {
        heroSection.style.display = ""; // Tampilkan Hero

        // 🔥 Tambahkan class ini untuk fade-in:
        setTimeout(() => {
          heroSection.classList.add("visible");
        }, 45); // Delay kecil supaya transition ke-trigger
      }
      body.classList.remove("entering");
      body.classList.add("entered");

      // Tampilkan navbar dan explore button
      setTimeout(() => {
        if (navbarElement) navbarElement.classList.add("visible");
        if (exploreButton) exploreButton.classList.add("visible");
      }, 1500);
    }, 650);
  });

  // Keyboard accessibility for logo button
  logoBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      logoBtn.click();
    }
  });

  // ========================================================
  // EXPLORE PAGE TRANSITION LOGIC
  // Navbar tetap, Hero Content diganti Explore Section
  // ========================================================

  if (exploreButton) {
    exploreButton.addEventListener("click", function () {
      console.log("🚀 EXPLORE BUTTON CLICKED! Starting transition...");

      // STEP 1: Fade out Hero Content dan sembunyikan heroSection
      if (heroSection) {
        const heroContent = heroSection.querySelector(".hero-content");

        if (heroContent) {
          heroContent.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";
          heroContent.style.opacity = "0";
          heroContent.style.transform = "translateY(-30px)";

          setTimeout(() => {
            heroSection.style.display = "none"; // Hero Section disembunyikan
            console.log("✅ Hero section hidden");
          }, 500);
        }
      }

      // STEP 2: Fade out Button Explore
      if (exploreButton) {
        exploreButton.style.transition = "opacity 0.3s ease";
        exploreButton.style.opacity = "0";
        setTimeout(() => {
          exploreButton.style.display = "none";
        }, 300);
      }

      // STEP 3: Navbar tetap visible (sudah di set 'visible' dari transisi landing)
      // Logika ini hanya untuk memastikan.
      if (navbarElement) {
        navbarElement.classList.add("visible");
        navbarElement.style.opacity = "1";
      }

      // STEP 4: Tampilkan Explore Section dengan animasi (delay 600ms)
      setTimeout(() => {
        if (exploreSection) {
          exploreSection.style.display = "block"; // Explore Section ditampilkan

          void exploreSection.offsetWidth;

          exploreSection.style.opacity = "1";
          exploreSection.style.transform = "translateY(0)";
          console.log("✅ Explore section shown with animation");

          animateCultureCards();
        }
      }, 600);

      // STEP 5: Scroll dan Overflow
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "auto";

      console.log("🎉 TRANSITION COMPLETE!");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".content-slide");
    const nextButton = document.querySelector(".next-arrow");
    const prevButton = document.querySelector(".prev-arrow");

    // Total jumlah slide
    const slideCount = slides.length;
    // Indeks slide saat ini, dimulai dari 0
    let currentSlideIndex = 0;

    // Fungsi utama untuk menggeser track
    function moveSlider() {
      // Hitung persentase pergeseran. Misalnya, slide 1 (index 0) = 0%, slide 2 (index 1) = -25%, dst.
      // Catatan: Karena di CSS .slider-track lebarnya 400% (untuk 4 slide),
      // setiap slide berlebar 25%. Jadi kita geser sebesar -25% * index.
      const translateValue = -(currentSlideIndex * (100 / slideCount));

      // Terapkan pergeseran horizontal menggunakan CSS Transform
      track.style.transform = `translateX(${translateValue}%)`;

      // Perbarui status tombol (aktif/non-aktif)
      updateArrowState();
    }

    // Fungsi untuk mengupdate tampilan tombol panah
    function updateArrowState() {
      prevButton.style.opacity = currentSlideIndex === 0 ? "0.3" : "1";
      prevButton.disabled = currentSlideIndex === 0;

      nextButton.style.opacity =
        currentSlideIndex === slideCount - 1 ? "0.3" : "1";
      nextButton.disabled = currentSlideIndex === slideCount - 1;
    }

    // Listener untuk tombol NEXT
    nextButton.addEventListener("click", function () {
      if (currentSlideIndex < slideCount - 1) {
        currentSlideIndex++;
        moveSlider();
      }
    });

    // Listener untuk tombol PREV
    prevButton.addEventListener("click", function () {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        moveSlider();
      }
    });

    // Panggil saat halaman pertama kali dimuat
    updateArrowState();
  });

  // ========================================================
  // ANIMASI CULTURE CARDS & MODAL HANDLERS
  // ========================================================
  function animateCultureCards() {
    // ... (Kode animasi cards)
    const cultureCards = document.querySelectorAll(".culture-card");
    if (cultureCards.length > 0) {
      cultureCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 100 + 100);
      });
    }
  }

  // ... (Semua Modal Handlers yang ada di kode sebelumnya)
  const loginModal = document.getElementById("loginModal");
  const btnLogin = document.querySelector(".btn-login");
  const modalClose = document.querySelector(".modal-close");
  const modalBackdrop = document.querySelector(".modal-backdrop");
  const loginForm = document.getElementById("loginForm");
  const forgotPasswordModal = document.getElementById("forgotPasswordModal");
  const forgotPasswordClose = document.getElementById("forgotPasswordClose");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const registerModal = document.getElementById("registerModal");
  const registerClose = document.getElementById("registerClose");
  const registerForm = document.getElementById("registerForm");
  const btnRegist = document.querySelector(".btn-regist");

  // Logika Modal
  function closeLoginModal() {
    loginModal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }
  btnLogin.addEventListener("click", () => {
    loginModal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  });
  modalClose.addEventListener("click", closeLoginModal);
  modalBackdrop.addEventListener("click", closeLoginModal);
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    closeLoginModal();
  });
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      loginModal.getAttribute("aria-hidden") === "false"
    ) {
      closeLoginModal();
    }
  });

  function closeForgotPasswordModal() {
    forgotPasswordModal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }
  document.querySelector(".forgot-password").addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.setAttribute("aria-hidden", "true");
    forgotPasswordModal.setAttribute("aria-hidden", "false");
  });
  forgotPasswordClose.addEventListener("click", closeForgotPasswordModal);
  document.querySelector(".back-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    closeForgotPasswordModal();
    loginModal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  });
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    closeForgotPasswordModal();
  });

  function closeRegisterModal() {
    registerModal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  }
  btnRegist.addEventListener("click", () => {
    loginModal.setAttribute("aria-hidden", "true");
    forgotPasswordModal.setAttribute("aria-hidden", "true");
    registerModal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  });
  registerClose.addEventListener("click", closeRegisterModal);
  document
    .querySelector(".login-from-register")
    .addEventListener("click", (e) => {
      e.preventDefault();
      closeRegisterModal();
      loginModal.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
    });
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    closeRegisterModal();
    loginModal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  });

  const cultureCards = document.querySelectorAll(".culture-card");
  if (cultureCards.length > 0) {
    cultureCards.forEach((card) => {
      card.addEventListener("click", function () {
        const cardTitle = this.querySelector("h3")?.textContent || "Unknown";
        alert(`Menuju halaman: ${cardTitle}\n\n(Halaman detail belum dibuat)`);
      });
    });
  }

  // UTILITY & KEYBOARD SHORTCUTS
  document.addEventListener("keydown", function (e) {
    if (
      (e.key === "e" || e.key === "E") &&
      exploreButton &&
      heroSection.style.display !== "none"
    ) {
      exploreButton.click();
    }
  });

  window.backToHero = function () {
    if (exploreSection) {
      exploreSection.style.opacity = "0";
      setTimeout(() => {
        exploreSection.style.display = "none";
      }, 500);
    }
    if (heroSection) {
      heroSection.style.display = "flex";
      setTimeout(() => {
        const heroContent = heroSection.querySelector(".hero-content");
        if (heroContent) {
          heroContent.style.opacity = "1";
          heroContent.style.transform = "translateY(0)";
        }
      }, 100);
    }
    if (exploreButton) {
      exploreButton.style.display = "block";
      setTimeout(() => {
        exploreButton.style.opacity = "1";
      }, 100);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log("✅ Final script loaded.");
});
