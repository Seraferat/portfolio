const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
const grid = document.querySelector(".project-grid");


// ФИЛЬТРАЦИЯ КАРТОЧЕК

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) =>
      item.classList.toggle("active", item === button)
    );

    const category = button.dataset.filter;

    cards.forEach((card) => {
      card.hidden =
        category !== "all" &&
        card.dataset.category !== category;
    });

    grid.scrollTo({ left: 0, behavior: "smooth" });
  });
});


// ПРОКРУТКА КАРУСЕЛИ

const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

function scrollCarousel(direction) {
  const card = grid.querySelector(".project-card:not([hidden])");

  if (!card) return;

  const gap = 8;
  const amount = (card.offsetWidth + gap) * 3;

  grid.scrollBy({
    left: direction * amount,
    behavior: "smooth"
  });
}

prevButton.addEventListener("click", () => {
  scrollCarousel(-1);
});

nextButton.addEventListener("click", () => {
  scrollCarousel(1);
});


// МОДАЛЬНОЕ ОКНО
// Открываем его только для старых карточек с data-title.

const dialog = document.querySelector(".project-dialog");

if (dialog) {
  const dialogImage = dialog.querySelector(".dialog-image");
  const dialogTitle = dialog.querySelector("h2");
  const dialogDescription = dialog.querySelector(
    ".dialog-copy > p:not(.eyebrow)"
  );
  const closeDialog = dialog.querySelector(".dialog-close");

  cards.forEach((card) => {
    if (card.tagName !== "BUTTON") return;

    card.addEventListener("click", () => {
      dialogTitle.textContent = card.dataset.title;
      dialogDescription.textContent = card.dataset.description;
      dialogImage.style.setProperty(
        "--dialog-image",
        getComputedStyle(card).getPropertyValue("--image")
      );
      dialog.showModal();
    });
  });

  closeDialog.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}


// МОБИЛЬНОЕ МЕНЮ

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Закрыть меню" : "Открыть меню"
    );
  });

  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    })
  );
}


// ТЕКУЩИЙ ГОД

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}