/**
 * LBEF HOOP FEST 2027 - Highlights Gallery Module (IMAGES ONLY)
 * ---------------------------------------------------------------------------
 * Displays all uploaded tournament & campus basketball photographs in an
 * images-only responsive grid with a full-screen lightbox viewer.
 * ---------------------------------------------------------------------------
 */

const HIGHLIGHT_IMAGES = [
  {
    src: "assets/images/court-match-action.jpg",
    alt: "Live basketball match action on court with players contesting in orange bibs"
  },
  {
    src: "assets/images/champion-red-squad-trophy.jpg",
    alt: "Champion red-jersey LBEF varsity basketball squad celebrating with golden trophy"
  },
  {
    src: "assets/images/captain-coach-golden-trophy.jpg",
    alt: "Team captain and coaches raising the golden championship trophy courtside"
  },
  {
    src: "assets/images/varsity-stage-trophy-lineup.jpg",
    alt: "LBEF varsity team lineup on main championship stage with trophy and college banner"
  },
  {
    src: "assets/images/championship-trophies-display.jpg",
    alt: "Tournament trophies, wooden winner shields, plaques, and medals display table"
  },
  {
    src: "assets/images/sports-carnival-medal-award.jpg",
    alt: "Athlete receiving medal on stage during the LBEF Sports Carnival awards ceremony"
  },
  {
    src: "assets/images/sports-carnival-ceremony-honors.jpg",
    alt: "Faculty dignitary presenting championship medal at LBEF Sports Carnival podium"
  },
  {
    src: "assets/images/table-officials-scoreboard.jpg",
    alt: "Tournament table officials managing the courtside match scoreboard"
  },
  {
    src: "assets/images/courtside-scorer-volunteer.jpg",
    alt: "Courtside volunteer scorer tracking match score next to basketball hoop"
  },
  {
    src: "assets/images/campus-registration-desk.jpg",
    alt: "Students checking in at the LBEF tournament registration and coordination desk"
  },
  {
    src: "assets/images/patron-podium-address.jpg",
    alt: "College dignitary delivering welcome address beside LBEF and APU banner"
  },
  {
    src: "assets/images/secretariat-faculty-team.jpg",
    alt: "LBEF faculty organizers and student sports coordinator portrait"
  },
  {
    src: "assets/images/secretariat-leadership-trio.jpg",
    alt: "Tournament organizing committee members and student delegate portrait"
  },
  {
    src: "assets/images/student-team-building.jpg",
    alt: "LBEF and APU student athletes collaborating in campus team-building challenge"
  },
  {
    src: "assets/images/lbef-campus-celebration.jpg",
    alt: "LBEF College Since 1998 commemorative campus celebration cake"
  }
];

let currentHighlightIndex = 0;

function renderHighlightsGrid(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const list = typeof limit === "number" ? HIGHLIGHT_IMAGES.slice(0, limit) : HIGHLIGHT_IMAGES;

  container.innerHTML = list.map((item, idx) => `
    <button
      type="button"
      class="highlight-photo-card"
      onclick="openHighlightsLightbox(${idx})"
      aria-label="Enlarge ${item.alt}"
    >
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
    </button>
  `).join("");
}

function ensureHighlightsLightbox() {
  let overlay = document.getElementById("highlights-lightbox-overlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "highlights-lightbox-overlay";
  overlay.className = "highlights-lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Highlight Image Preview");

  overlay.innerHTML = `
    <button type="button" class="lightbox-close-btn" onclick="closeHighlightsLightbox()" aria-label="Close image preview">
      <span class="material-symbols-outlined">close</span>
    </button>
    <button type="button" class="lightbox-nav-btn lightbox-nav-prev" onclick="prevHighlightImage(event)" aria-label="Previous highlight image">
      <span class="material-symbols-outlined">chevron_left</span>
    </button>
    <div class="highlights-lightbox-frame">
      <img id="highlights-lightbox-img" class="highlights-lightbox-img" src="" alt="">
    </div>
    <button type="button" class="lightbox-nav-btn lightbox-nav-next" onclick="nextHighlightImage(event)" aria-label="Next highlight image">
      <span class="material-symbols-outlined">chevron_right</span>
    </button>
  `;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("highlights-lightbox-frame")) {
      closeHighlightsLightbox();
    }
  });

  document.body.appendChild(overlay);
  return overlay;
}

function updateHighlightsLightboxImage() {
  const item = HIGHLIGHT_IMAGES[currentHighlightIndex];
  const imgEl = document.getElementById("highlights-lightbox-img");
  if (item && imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.alt;
  }
}

function openHighlightsLightbox(index) {
  if (index < 0 || index >= HIGHLIGHT_IMAGES.length) return;
  currentHighlightIndex = index;
  const overlay = ensureHighlightsLightbox();
  updateHighlightsLightboxImage();
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeHighlightsLightbox() {
  const overlay = document.getElementById("highlights-lightbox-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function prevHighlightImage(e) {
  if (e) e.stopPropagation();
  currentHighlightIndex = (currentHighlightIndex - 1 + HIGHLIGHT_IMAGES.length) % HIGHLIGHT_IMAGES.length;
  updateHighlightsLightboxImage();
}

function nextHighlightImage(e) {
  if (e) e.stopPropagation();
  currentHighlightIndex = (currentHighlightIndex + 1) % HIGHLIGHT_IMAGES.length;
  updateHighlightsLightboxImage();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHighlightsGrid("highlights-gallery-grid");
  renderHighlightsGrid("home-highlights-grid", 8);

  document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("highlights-lightbox-overlay");
    if (!overlay || !overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeHighlightsLightbox();
    if (e.key === "ArrowLeft") prevHighlightImage();
    if (e.key === "ArrowRight") nextHighlightImage();
  });
});

window.openHighlightsLightbox = openHighlightsLightbox;
window.closeHighlightsLightbox = closeHighlightsLightbox;
window.prevHighlightImage = prevHighlightImage;
window.nextHighlightImage = nextHighlightImage;
