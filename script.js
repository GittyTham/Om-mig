// 1. Hitta elementen
const readMoreBtn = document.querySelector("#read-more");
const moreText = document.querySelector(".more-text");

// 2. Lyssna efter klicken
readMoreBtn.addEventListener("click", () => {
  // 3. Växla hidden på och av
  moreText.hidden = !moreText.hidden;
  readMoreBtn.setAttribute("aria-expanded", !moreText.hidden);
  // 4. Byt texten på knappen
  if (moreText.hidden) {
    readMoreBtn.textContent = "Läs mer";
  } else {
    readMoreBtn.textContent = "Visa mindre";
  }
});

// FLIKAR

// 1. Hitta ALLA flikar och ALLA paneler
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

// 2. Funktion som visar en viss flik
function showTab(panelId) {
  // Nollställ : ta bort "active" från alla flikar och dölj alla paneler
  tabs.forEach((t) => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
    t.tabIndex = -1; // bara den aktiva fliken ska nås med Tab
  });
  panels.forEach((p) => (p.hidden = true));

  // Aktivera rätt flik och visa panelen som hör till den
  const tab = document.querySelector(`.tab[data-tab="${panelId}"]`);
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");
  tab.tabIndex = 0;
  document.getElementById(panelId).hidden = false;
  return tab;
}

// 3. Klick lyssnare på varje flik
tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});

// 3b. Piltangenter mellan flikarna (som i vanliga appar)
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

// 4. "Kontakta mig" och "Kontakt" i menyn öppnar Kontakt-fliken
document.querySelectorAll('a[href="#kontakt"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showTab("kontakt");
    document.querySelector(".content").scrollIntoView({ behavior: "smooth" });
    document.querySelector("#namn").focus({ preventScroll: true });
  });
});

// 5. Om någon kommer till sidan via länken .../#kontakt
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

  // 1. Lägg till eller ta bort en bokstav
  if (isDeleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  // 2. Visa så många bokstäver av ordet
  typeEl.textContent = currentWord.slice(0, letterIndex);

  // 3. Hur länge ska vi vänta till nästa bokstav?
  let delay = isDeleting ? 60 : 120;

  // 4. Är ordet färdigskrivet? Pausa, börja sedan sudda
  if (!isDeleting && letterIndex === currentWord.length) {
    delay = 1500;
    isDeleting = true;
  }
  // 5. Är ordet helt borta? Byt till nästa ord
  else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  // 6. Kör funktionen igen efter "delay" millisekunder
  setTimeout(type, delay);
}

type(); // Starta!

// KONTAKT FORMULÄR
const form = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  // 1. Stoppa omladdningen
  event.preventDefault();

  // 2. Hämta värdena (trim tar bort mellanslag före och efter)
  const name = form.namn.value.trim();
  const email = form.epost.value.trim();
  const message = form.meddelande.value.trim();

  // 3. Är något fält tomt?
  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Fyll i alla fält, tack!";
    formMessage.className = "form-message error";
    return;
  }

  // 5. Allt ok!
  formMessage.textContent = `Tack ${name}! Jag hör av mig snart.`;
  formMessage.className = "form-message success";
  form.reset();
});

// TIDSLINJEN
const timeline = document.querySelector(".timeline");
const timelineItems = document.querySelectorAll(".timeline-item");

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
