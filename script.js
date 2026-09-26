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

// 2. Klick lyssnare på varje flick
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // 3. Nollställ : ta bort "active" från alla flikar och dölj alla paneler
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach((p) => (p.hidden = true));

    // 4. Aktivera fliken man klickar på
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    // 5. Visa panelen som hör till fliken
    const panelId = tab.dataset.tab; // t.ex " skills "
    document.getElementById(panelId).hidden = false;
  });
});

// MÖRKT LÄGE

const themetoggle = document.querySelector("#theme-toggle");

themetoggle.addEventListener("click", () => {
  // Växla klassen "dark" på <body>
  document.body.classList.toggle("dark");

  // Kolla om mörkt läge är på just nu
  const isDark = document.body.classList.contains("dark");

  // Byt texten på knappen
  themetoggle.textContent = isDark ? "Ljust läge" : "Mörkt läge";
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
