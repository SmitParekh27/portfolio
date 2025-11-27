// Highlight active nav on scroll
(function () {
  const links = document.querySelectorAll(".nav-link");
  const sections = Array.from(document.querySelectorAll("main section"));

  function onScroll() {
    const offset = window.scrollY + 120;
    let current = "home";
    sections.forEach(sec => {
      if (offset >= sec.offsetTop && offset < sec.offsetTop + sec.offsetHeight) {
        current = sec.id;
      }
    });
    links.forEach(link => {
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
})();

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
