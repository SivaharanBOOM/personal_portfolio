// ================================
// PORTFOLIO INTERACTIONS (VERTICAL)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileClose = document.querySelector(".mobile-menu-close");

  // Helper: smooth scroll to a section by id
  function scrollToSection(id) {
    const target = document.querySelector(id);
    if (!target) return;

    // Always use vertical smooth scroll
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // =========================
  // NAVIGATION – ACTIVE STATE
  // =========================

  function setActiveLink(sectionId) {
    const selector = `[href="#${sectionId}"]`;

    [navLinks, mobileNavLinks].forEach((list) => {
      list.forEach((link) => {
        if (link.matches(selector)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  }

  // Observe sections to update active nav item
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActiveLink(id);
        }
      });
    },
    {
      root: null,
      threshold: 0.6,
    }
  );

  sections.forEach((section) => observer.observe(section));

  // =========================
  // NAVIGATION – CLICK SCROLL
  // =========================

  function handleNavClick(event) {
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();

    scrollToSection(href);

    // Close mobile menu if open
    if (mobileOverlay && mobileOverlay.classList.contains("is-open")) {
      mobileOverlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  }

  navLinks.forEach((link) => link.addEventListener("click", handleNavClick));
  mobileNavLinks.forEach((link) => link.addEventListener("click", handleNavClick));

  // =========================
  // MOBILE MENU
  // =========================

  function openMobileMenu() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  mobileToggle && mobileToggle.addEventListener("click", openMobileMenu);
  mobileClose && mobileClose.addEventListener("click", closeMobileMenu);

  // Close overlay when clicking outside the menu panel
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) {
        closeMobileMenu();
      }
    });
  }

});
