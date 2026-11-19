/**
 * LBEF HOOP FEST 2027 - News & Updates Module
 * ---------------------------------------------------------------------------
 * Update tournament announcements, registration updates, match schedules,
 * and important notices directly in the `TOURNAMENT_NEWS` array below.
 * ---------------------------------------------------------------------------
 */

const TOURNAMENT_NEWS = [
  {
    id: "fixtures",
    category: "fixtures",
    badge: "FIXTURES",
    badgeBg: "var(--court-orange)",
    badgeColor: "#ffffff",
    date: "October 05, 2027",
    source: "Secretariat Release",
    title: "Official 32-Clash Schedule Released for Hoop Fest 2027",
    summary: "LBEF Athletic Advisory Board has ratified the official group pairings and knockout progression path across Courts 1 & 2.",
    image: "assets/images/court-match-action.jpg",
    imageAlt: "LBEF basketball players competing on court during official match action",
    body: `KATHMANDU, NEPAL — The Athletic Advisory Board of Lord Buddha Education Foundation has officially ratified the fixture calendar for LBEF Hoop Fest 2027. Running from October 25 to October 30 at the Maitidevi Arena, the tournament features sixteen varsity squads competing across thirty-two matches.

Matches will commence daily at 09:30 AM NPT on Courts 1 and 2. Group stage play runs from October 25 through October 26, followed by the single-elimination Quarterfinals on October 27. The Semifinals are slated for October 28, leading to the Bronze Medal Clash on October 29 and the Championship Grand Finale on October 30.

All games will be live-streamed with student commentary via the LBEF Media Hub.`
  },
  {
    id: "deadline",
    category: "registration",
    badge: "REGISTRATION",
    badgeBg: "#ef4444",
    badgeColor: "#ffffff",
    date: "October 02, 2027",
    source: "Registration Desk",
    title: "Team Roster Cutoff Confirmed for October 18, 2027",
    summary: "Department captains are reminded that player physical IDs, jersey numbers, and faculty sign-offs must be submitted online before midnight.",
    image: "assets/images/campus-registration-desk.jpg",
    imageAlt: "Students submitting rosters at the LBEF tournament registration desk",
    body: `KATHMANDU, NEPAL — The registration desk has reminded all department captains that the deadline for online team submissions is strictly October 18, 2027 at 11:59 PM NPT.

No player additions or jersey modifications will be permitted after this cutoff. Ensure that all roster athletes possess active LBEF smart campus cards with valid semester roll numbers.`
  },
  {
    id: "apu_coaches",
    category: "campus",
    badge: "CAMPUS",
    badgeBg: "#2e7d32",
    badgeColor: "#ffffff",
    date: "September 28, 2027",
    source: "International Exchange",
    title: "APU Malaysian Guest Coaches to Conduct Elite Player Clinics",
    summary: "Visiting coaching faculty from Asia Pacific University Kuala Lumpur will offer free ball-handling masterclasses for all registered varsity players.",
    image: "assets/images/patron-podium-address.jpg",
    imageAlt: "Faculty speaker at podium beside LBEF and APU Malaysia academic banner",
    body: `KATHMANDU, NEPAL — In celebration of the ongoing academic partnership between Lord Buddha Education Foundation and Asia Pacific University of Technology & Innovation (APU), Malaysia, an elite guest coaching delegation will arrive in Kathmandu on October 22.

Led by former Malaysian collegiate head coaches, the delegation will conduct two specialized training masterclasses at Maitidevi Arena:
1. Fastbreak Transition Drills & Defensive Recovery
2. 3-Point Shooting Mechanics & Tactical Ball Screen Reads

Participation is complimentary for all registered Hoop Fest student athletes with physical college ID.`
  },
  {
    id: "volunteers",
    category: "campus",
    badge: "NOTICE",
    badgeBg: "#7e22ce",
    badgeColor: "#ffffff",
    date: "September 22, 2027",
    source: "Student Affairs",
    title: "Calling Courtside Volunteers: Join the Event Operations Team",
    summary: "Gain practical sports administration experience in scorekeeping, digital photography, team hospitality, and first aid dispatch.",
    image: "assets/images/courtside-scorer-volunteer.jpg",
    imageAlt: "Courtside student volunteer managing tournament scoreboard",
    body: `KATHMANDU, NEPAL — The LBEF Sports Council is actively recruiting energetic student volunteers to join the tournament operations crew.

Positions available include:
- Table Officiating & 24s Clock Operator Assistants
- Court Floor Assistants (Towel & Hardwood Maintenance)
- Media Team (Courtside Photography & Social Dispatch)
- Guest Hospitality & Athlete Locker Room Liaison

All volunteers will receive an official LBEF Hoop Fest Varsity Polo, meal stipends, and an accredited Certificate of Sports Event Management signed by the Dean.`
  },
  {
    id: "trophy",
    category: "campus",
    badge: "AWARDS",
    badgeBg: "#eab308",
    badgeColor: "#0B192C",
    date: "September 15, 2027",
    source: "Honors Council",
    title: "Hoop Fest 2027 Championship Trophy Unveiled in Maitidevi",
    summary: "Crafted from polished sterling silver and Nepali hardwood, the 2027 Victory Cup stands ready for the inter-faculty champion.",
    image: "assets/images/championship-trophies-display.jpg",
    imageAlt: "LBEF Hoop Fest 2027 championship trophies, winner shields, and medals display",
    body: `KATHMANDU, NEPAL — The sparkling 2027 Victory Cup was officially unveiled today in the LBEF Main Auditorium by Tournament Patron Prof. Dr. R. K. Sharma.

Standing 65cm tall and hand-crafted from polished silver alloy and Nepali walnut hardwood, the trophy bears the inscribed names of all collegiate champions since 2018. Alongside the trophy, the winning team will lift a cash bursary of NPR 80,000, while the tournament MVP will be awarded the Golden Ball Plaque.`
  },
  {
    id: "rules_bulletin",
    category: "rules",
    badge: "REGULATIONS",
    badgeBg: "#c62828",
    badgeColor: "#ffffff",
    date: "September 10, 2027",
    source: "Technical Directorate",
    title: "Certified FIBA Nepal Officials Appointed for 2027 Tournament",
    summary: "Neutral certification guaranteed across all 32 tournament games with senior table officials overseeing 24s shot clocks and video review.",
    image: "assets/images/table-officials-scoreboard.jpg",
    imageAlt: "Tournament table officials overseeing match scoreboard and rules compliance",
    body: `KATHMANDU, NEPAL — To preserve the highest standard of sporting integrity, the LBEF Secretariat has contracted official FIBA Level 2 and Level 3 certified referees from the Nepal Basketball Association (NeBA).

Key tournament reminders:
- Electronic 24-second shot clocks will be active on both courts.
- Jump ball scenarios will follow the possession arrow protocol.
- FIBA anti-doping regulations and campus alcohol-free standards will be strictly enforced.`
  }
];

let activeNewsCat = "all";

function createNewsCardHTML(item) {
  return `
    <article class="card news-card" data-cat="${item.category}" style="padding: 0; overflow: hidden;">
      <div class="news-card-img-wrap">
        <img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
        <span class="badge-tag" style="position: absolute; top: 12px; left: 12px; background: ${item.badgeBg}; color: ${item.badgeColor}; font-weight: 800;">
          ${item.badge}
        </span>
      </div>
      <div style="padding: 20px; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        <div>
          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${item.date} &bull; ${item.source}</span>
          <h3 class="card-title" style="margin-top: 6px;">${item.title}</h3>
          <p class="card-text">${item.summary}</p>
        </div>
        <div style="margin-top: 16px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="readArticle('${item.id}')">Read Full Bulletin &rarr;</button>
        </div>
      </div>
    </article>
  `;
}

function renderNewsGrid() {
  const fullGrid = document.getElementById("news-grid");
  if (fullGrid) {
    const searchInput = document.getElementById("news-search");
    const query = (searchInput ? searchInput.value : "").toLowerCase().trim();

    const filtered = TOURNAMENT_NEWS.filter((item) => {
      const matchCat = activeNewsCat === "all" || item.category === activeNewsCat;
      const searchable = `${item.title} ${item.summary} ${item.badge} ${item.source}`.toLowerCase();
      const matchQuery = !query || searchable.includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      fullGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background: var(--varsity-navy); border-radius: var(--radius-md); border: 1px dashed var(--court-border);">
          <span class="material-symbols-outlined" style="font-size: 40px; color: var(--text-muted); margin-bottom: 8px;">newspaper</span>
          <h4 style="font-family: var(--font-display); font-size: 18px; color: var(--pure-white);">No Bulletins Found</h4>
          <p style="font-size: 13px; color: var(--secondary); margin-top: 4px;">Try a different keyword or select "All Stories".</p>
        </div>
      `;
    } else {
      fullGrid.innerHTML = filtered.map(createNewsCardHTML).join("");
    }
  }

  // Homepage News & Updates Preview (latest 3 items)
  const homeGrid = document.getElementById("home-news-grid");
  if (homeGrid) {
    homeGrid.innerHTML = TOURNAMENT_NEWS.slice(0, 3).map(createNewsCardHTML).join("");
  }
}

function setNewsCat(cat, btn) {
  activeNewsCat = cat;
  document.querySelectorAll(".news-filter").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderNewsGrid();
}

function filterNews() {
  renderNewsGrid();
}

function ensureArticleModal() {
  let modal = document.getElementById("modal-article-reader");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "modal-article-reader";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-box" style="max-width: 680px;">
      <button class="modal-close" onclick="closeModal('modal-article-reader')" aria-label="Close modal">
        <span class="material-symbols-outlined">close</span>
      </button>
      <div id="article-reader-body"></div>
    </div>
  `;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal("modal-article-reader");
  });
  document.body.appendChild(modal);
  return modal;
}

function readArticle(articleId) {
  const art = TOURNAMENT_NEWS.find((item) => item.id === articleId);
  if (!art) return;

  ensureArticleModal();
  const body = document.getElementById("article-reader-body");
  if (body) {
    body.innerHTML = `
      <span class="badge-tag" style="background: rgba(255,87,34,0.2); color: var(--court-orange); margin-bottom: 8px; display: inline-block;">${art.badge}</span>
      <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--pure-white); margin-bottom: 6px;">${art.title}</h3>
      <span style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 16px;">Published on ${art.date} &bull; ${art.source}</span>
      <div style="font-size: 14px; color: var(--secondary); line-height: 1.7; white-space: pre-line; background: var(--surface-low); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--court-border);">
        ${art.body}
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal('modal-article-reader')">Close Article</button>
      </div>
    `;
  }
  openModal("modal-article-reader");
}

document.addEventListener("DOMContentLoaded", () => {
  renderNewsGrid();
});

window.setNewsCat = setNewsCat;
window.filterNews = filterNews;
window.readArticle = readArticle;
