const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".page-section");

function showSection(id) {
  sections.forEach(section => section.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  links.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`nav a[data-section="${id}"]`);
  if (activeLink) activeLink.classList.add("active");
}

// Navbar click
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

// Explore button → About
const exploreBtn = document.getElementById("exploreBtn");
if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    showSection("about");
  });
}
