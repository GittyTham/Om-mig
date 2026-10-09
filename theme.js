// MÖRKT LÄGE
const themeToggle = document.querySelector("#theme-toggle");

// Startläge: sparat val eller systemets inställning
try {
  const saved = localStorage.getItem("theme");
  const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}

// Visa rätt text på knappen
function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  themeToggle.textContent = isDark ? "Ljust läge" : "Mörkt läge";
  themeToggle.setAttribute("aria-pressed", isDark);
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  // Växla klassen "dark" på <html>
  const isDark = document.documentElement.classList.toggle("dark");

  // Spara valet så det finns kvar nästa gång
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}

  updateThemeButton();
});
