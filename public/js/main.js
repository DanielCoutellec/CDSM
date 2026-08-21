document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MENU MOBILE
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

  }


  // ==========================================
  // HERO SLIDER
  // ==========================================

  const slides = document.querySelectorAll(".hero-slide");

  if (slides.length > 1) {

    let currentSlide = 0;

    setInterval(() => {

      slides[currentSlide].classList.remove("active");

      currentSlide =
        (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active");

    }, 4000);

  }

});