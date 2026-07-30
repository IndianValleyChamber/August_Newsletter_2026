/* =========================================================
   IVCC NEWSLETTER
   Editorial Web Version
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navigationLinks = document.querySelectorAll(
    '.newsletter-nav a[href^="#"], a[href="#top"], .meeting-card-link[href^="#"]'
  );

  const newsletterNavigation = document.querySelector(".newsletter-nav");
  const sections = document.querySelectorAll("section[id]");

  /* =======================================================
     SMOOTH SCROLLING
     ======================================================= */

  navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navigationHeight = newsletterNavigation
        ? newsletterNavigation.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navigationHeight -
        18;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      window.history.replaceState(null, "", targetId);
    });
  });


  /* =======================================================
     ACTIVE NAVIGATION LINK
     ======================================================= */

  const navigationSectionLinks = Array.from(
    document.querySelectorAll('.newsletter-nav a[href^="#"]')
  );

  const updateActiveNavigation = () => {
    if (!sections.length || !navigationSectionLinks.length) {
      return;
    }

    const navigationHeight = newsletterNavigation
      ? newsletterNavigation.offsetHeight
      : 0;

    const scrollPosition =
      window.scrollY + navigationHeight + window.innerHeight * 0.24;

    let currentSectionId = "";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.id;
      }
    });

    navigationSectionLinks.forEach((link) => {
      const linkTarget = link.getAttribute("href");
      const isActive = linkTarget === `#${currentSectionId}`;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  updateActiveNavigation();

  window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
  });

  window.addEventListener("resize", updateActiveNavigation);


  /* =======================================================
     IMAGE CAPTIONS FOR TOUCH DEVICES
     ======================================================= */

  const imageCards = document.querySelectorAll(".image-card");

  imageCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const isTouchDevice =
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches;

      if (!isTouchDevice) {
        return;
      }

      const parentLink = card.closest("a");

      if (parentLink && !card.classList.contains("caption-visible")) {
        event.preventDefault();
      }

      imageCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("caption-visible");
        }
      });

      card.classList.toggle("caption-visible");
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".image-card")) {
      return;
    }

    imageCards.forEach((card) => {
      card.classList.remove("caption-visible");
    });
  });


  /* =======================================================
     OPEN EXTERNAL LINKS SAFELY
     ======================================================= */

  const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
  );

  externalLinks.forEach((link) => {
    const currentRel = link.getAttribute("rel") || "";
    const relValues = new Set(currentRel.split(/\s+/).filter(Boolean));

    relValues.add("noopener");
    relValues.add("noreferrer");

    link.setAttribute("rel", Array.from(relValues).join(" "));
  });


  /* =======================================================
     SUPPORT DIRECT LINKS TO PAGE SECTIONS
     ======================================================= */

  const scrollToInitialHash = () => {
    const initialHash = window.location.hash;

    if (!initialHash || initialHash === "#") {
      return;
    }

    const target = document.querySelector(initialHash);

    if (!target) {
      return;
    }

    window.setTimeout(() => {
      const navigationHeight = newsletterNavigation
        ? newsletterNavigation.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navigationHeight -
        18;

      window.scrollTo({
        top: targetPosition,
        behavior: "auto"
      });
    }, 100);
  };

  scrollToInitialHash();
});
