// Hitta elementen
const readMoreBtn = document.querySelector("#read-more");
const moreText = document.querySelector(".more-text");

// Lyssna efter klicken
readMoreBtn.addEventListener("click", () => {
  // Växla hidden på och av
  moreText.hidden = !moreText.hidden;
  readMoreBtn.setAttribute("aria-expanded", !moreText.hidden);
  // Byt texten på knappen
  if (moreText.hidden) {
    readMoreBtn.textContent = "Läs mer";
  } else {
    readMoreBtn.textContent = "Visa mindre";
  }
});

// FLIKARNA

// Hitta ALLA flikar och ALLA paneler
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

// Funktion som visar en viss flik
function showTab(panelId) {
  // Nollställ : ta bort "active" från alla flikar och dölj alla paneler
  tabs.forEach((t) => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  panels.forEach((p) => (p.hidden = true));

  // Aktivera rätt flik och visa panelen som hör till den
  const tab = document.querySelector(`.tab[data-tab="${panelId}"]`);
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");
  document.getElementById(panelId).hidden = false;
  return tab;
}

// Klick lyssnare på varje flik
tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});

// Piltangenter mellan flikarna (som i vanliga appar)
const tabList = [...tabs];
document.querySelector(".tabs").addEventListener("keydown", (event) => {
  const current = tabList.indexOf(document.activeElement);
  if (current === -1) return;

  let next;
  if (event.key === "ArrowRight") next = (current + 1) % tabList.length;
  else if (event.key === "ArrowLeft")
    next = (current - 1 + tabList.length) % tabList.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = tabList.length - 1;
  else return; // annan tangent: gör inget

  event.preventDefault();
  showTab(tabList[next].dataset.tab).focus();
});

// "Kontakta mig" och "Kontakt" i menyn öppnar Kontakt-fliken
document.querySelectorAll('a[href="#kontakt"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showTab("kontakt");
    document.querySelector(".content").scrollIntoView({ behavior: "smooth" });
    document.querySelector("#namn").focus({ preventScroll: true });
  });
});

// Om någon kommer till sidan via länken .../#kontakt
if (location.hash === "#kontakt") {
  showTab("kontakt");
}

// MÖRKT LÄGE
// (Själva startläget sätts redan i <head> så sidan inte blinkar)
const themetoggle = document.querySelector("#theme-toggle");

// Visa rätt text på knappen
function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  themetoggle.textContent = isDark ? "Ljust läge" : "Mörkt läge";
  themetoggle.setAttribute("aria-pressed", isDark);
}
updateThemeButton();

themetoggle.addEventListener("click", () => {
  // Växla klassen "dark" på <html>
  const isDark = document.documentElement.classList.toggle("dark");

  // Spara valet så det finns kvar nästa gång
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}

  updateThemeButton();
});

// TYPEWRITER
const words = ["UX-student", "kodare", "designer"];
const typeEl = document.querySelector("#typewriter");

let wordIndex = 0;
let letterIndex = 0; // hur många bokstäver som syns
let isDeleting = false; // skriver vi eller suddar vi?

function type() {
  const currentWord = words[wordIndex];

  // Lägg till eller ta bort en bokstav
  if (isDeleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  // Visa ordet med rätt antal bokstäver
  typeEl.textContent = currentWord.slice(0, letterIndex);

  // Hur länge ska vi vänta till nästa bokstav? Snabbare när vi suddar
  let delay = isDeleting ? 60 : 120;

  // Är ordet helt skrivet? Vänta lite och börja sudda
  if (!isDeleting && letterIndex === currentWord.length) {
    delay = 1500;
    isDeleting = true;
  }
  // Är ordet helt suddat? Vänta lite och börja skriva nästa ord
  else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  // Kör funktionen igen efter "delay" millisekunder
  setTimeout(type, delay);
}

type(); // Starta skrivmaskinen

// KONTAKT FORMULÄR
const form = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  // Stoppa omladdningen av sidan
  event.preventDefault();

  // Hämta värdena (trim tar bort mellanslag före och efter)
  const name = form.namn.value.trim();
  const email = form.epost.value.trim();
  const message = form.meddelande.value.trim();

  // Har vi alla fält? Om inte, visa felmeddelande och returnera
  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Fyll i alla fält, tack!";
    formMessage.className = "form-message error";
    return;
  }

  // Allt fungerar, visa tackmeddelande och töm formuläret
  formMessage.textContent = `Tack ${name}! Jag hör av mig snart.`;
  formMessage.className = "form-message success";
  form.reset();
});

// TIDSLINJEN
const timelineData = [
  {
    year: 2026,
    title: "Började på Chas Academy",
    description: "Startade på UX Engineer-utbildningen",
  },
  {
    year: 2021,
    title: "Myrsjöskolan",
    description: "Fritidsledare och elevassistent",
  },
  { year: 2024, title: "Umeå Universitet", description: "Lärde mig C#" },
  { year: 2025, title: "Gävle Universitet", description: "Lärde mig Java" },
];

/* Skapa HTML för tidslinjen */
const timeline = document.querySelector(".timeline");

timeline.innerHTML = timelineData
  .sort((a, b) => a.year - b.year)
  .map(
    (item) => `
      <li class="timeline-item">
      <span class="timeline-year">${item.year}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      </li>
    `,
  )
  .join("");

const timelineItems = document.querySelectorAll(".timeline-item");

/* const timeline = document.querySelector(".timeline");
const timelineItems = document.querySelectorAll(".timeline-item");
 */

// Slå på animationen (bara om JS fungerar)
timeline.classList.add("animate");

// Skapa en observatör som håller koll på vad som syns
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 1 },
);

// Be obesrvtören titta på varje punkt i tidslinjen
timelineItems.forEach((item) => observer.observe(item));
