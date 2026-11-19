/**
 * LBEF HOOP FEST 2027 - Gallery & Lightbox Module
 * Filterable tournament photography using uploaded local images in assets/images/,
 * high-res modal lightbox with Next/Prev and keyboard support
 */

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'action',
    title: 'Court Clash & Defense',
    caption: 'High-intensity match possession with players in orange tournament bibs battling near the paint.',
    img: 'assets/images/court-match-action.jpg',
    alt: 'Live basketball match action on court with players contesting in orange bibs'
  },
  {
    id: 2,
    category: 'teams',
    title: 'Champions With The Trophy',
    caption: 'Red-jersey LBEF varsity champions posing courtside with the golden tournament cup.',
    img: 'assets/images/champion-red-squad-trophy.jpg',
    alt: 'Champion red-jersey LBEF varsity basketball squad celebrating with golden trophy'
  },
  {
    id: 3,
    category: 'awards',
    title: 'Sports Carnival Medal Award',
    caption: 'Medal presentation on the LBEF Sports Carnival podium celebrating standout athletic achievement.',
    img: 'assets/images/sports-carnival-medal-award.jpg',
    alt: 'Athlete receiving medal on stage during the LBEF Sports Carnival awards ceremony'
  },
  {
    id: 4,
    category: 'awards',
    title: 'The Golden Victory Cup',
    caption: 'Blue-jersey team captain and LBEF coaching mentors hoisting the golden championship trophy.',
    img: 'assets/images/captain-coach-golden-trophy.jpg',
    alt: 'Team captain and coaches raising the golden championship trophy courtside'
  },
  {
    id: 5,
    category: 'arena',
    title: 'Varsity Championship Stage',
    caption: 'LBEF varsity athletes lined up on the main auditorium stage beside the silver championship trophy.',
    img: 'assets/images/varsity-stage-trophy-lineup.jpg',
    alt: 'LBEF varsity team lineup on main championship stage with trophy and college banner'
  },
  {
    id: 6,
    category: 'awards',
    title: 'Dignitary Honors Presentation',
    caption: 'Faculty leadership decorating tournament standouts with championship medals at the awards desk.',
    img: 'assets/images/sports-carnival-ceremony-honors.jpg',
    alt: 'Faculty dignitary presenting championship medal at LBEF Sports Carnival podium'
  },
  {
    id: 7,
    category: 'awards',
    title: 'Trophies, Shields & Medals',
    caption: 'Full collection of engraved winner shields, commemorative plaques, and championship medals ready for finale.',
    img: 'assets/images/championship-trophies-display.jpg',
    alt: 'Tournament trophies, wooden winner shields, plaques, and medals display table'
  },
  {
    id: 8,
    category: 'action',
    title: 'Table Officials & Scoreboard',
    caption: 'Student volunteers and table officials tracking points and clock fouls at the courtside desk.',
    img: 'assets/images/table-officials-scoreboard.jpg',
    alt: 'Tournament table officials managing the courtside match scoreboard'
  },
  {
    id: 9,
    category: 'action',
    title: 'Courtside Scorekeeper',
    caption: 'Dedicated scorekeeper managing live game tally beside the basketball stanchion.',
    img: 'assets/images/courtside-scorer-volunteer.jpg',
    alt: 'Courtside volunteer scorer tracking match score next to basketball hoop'
  },
  {
    id: 10,
    category: 'teams',
    title: 'Athlete Check-In Desk',
    caption: 'Student organizers verifying team rosters and campus IDs at the LBEF registration table.',
    img: 'assets/images/campus-registration-desk.jpg',
    alt: 'Students checking in at the LBEF tournament registration and coordination desk'
  },
  {
    id: 11,
    category: 'teams',
    title: 'APU & LBEF Team Spirit',
    caption: 'Student squads in varsity polos collaborating during off-court leadership and team-building activities.',
    img: 'assets/images/student-team-building.jpg',
    alt: 'LBEF and APU student athletes collaborating in campus team-building challenge'
  },
  {
    id: 12,
    category: 'arena',
    title: 'Opening Podium Address',
    caption: 'College leadership addressing athletes alongside the LBEF and APU Malaysia academic banner.',
    img: 'assets/images/patron-podium-address.jpg',
    alt: 'College dignitary delivering welcome address beside LBEF and APU banner'
  },
  {
    id: 13,
    category: 'arena',
    title: 'LBEF Heritage Celebration',
    caption: 'Commemorating LBEF Since 1998 excellence with campus student and athletic festivities.',
    img: 'assets/images/lbef-campus-celebration.jpg',
    alt: 'LBEF College Since 1998 commemorative campus celebration cake'
  }
];

let currentLightboxIndex = 0;
let activeGalleryCategory = 'all';

function renderGallery() {
  const container = document.getElementById('gallery-grid-container');
  if (!container) return;

  const filtered = GALLERY_ITEMS.filter(item => {
    return activeGalleryCategory === 'all' || item.category === activeGalleryCategory;
  });

  container.innerHTML = filtered.map((item) => {
    return `
      <div class="card" style="padding: 0; cursor: pointer; border-radius: var(--radius-md); overflow: hidden;" onclick="openGalleryLightbox(${item.id})">
        <div style="position: relative; aspect-ratio: 1 / 1; max-height: 280px; width: 100%; overflow: hidden; background: var(--surface-high);">
          <img src="${item.img}" alt="${item.alt}" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; transition: transform 0.4s ease; display: block;" class="gallery-thumb">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,54,0.92) 0%, transparent 55%);"></div>
          <div style="position: absolute; bottom: 12px; left: 14px; right: 14px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span class="badge-tag" style="background: rgba(255,87,34,0.22); color: var(--court-orange); margin-bottom: 4px; display: inline-block;">${item.category.toUpperCase()}</span>
              <h4 style="font-family: var(--font-display); font-size: 16px; color: #FFFFFF; font-weight: 700;">${item.title}</h4>
            </div>
            <span class="material-symbols-outlined" style="color: var(--court-orange); font-size: 24px;">zoom_in</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterGallery(category, buttonEl) {
  activeGalleryCategory = category;
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');
  renderGallery();
}

function openGalleryLightbox(itemId) {
  const itemIndex = GALLERY_ITEMS.findIndex(i => i.id === itemId);
  if (itemIndex === -1) return;
  currentLightboxIndex = itemIndex;
  updateLightboxContent();
  openModal('gallery-lightbox-modal');
}

function updateLightboxContent() {
  const item = GALLERY_ITEMS[currentLightboxIndex];
  if (!item) return;

  const content = document.getElementById('lightbox-content-box');
  if (content) {
    content.innerHTML = `
      <div style="position: relative; max-height: 520px; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 16px; background: #081221; text-align: center; padding: 12px;">
        <img src="${item.img}" alt="${item.alt}" style="max-height: 460px; max-width: 100%; width: auto; object-fit: contain; margin: 0 auto; display: block; border-radius: var(--radius-sm);">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
        <div>
          <span class="badge-tag" style="background: rgba(255,87,34,0.2); color: var(--court-orange); margin-bottom: 6px; display: inline-block;">${item.category.toUpperCase()}</span>
          <h3 style="font-family: var(--font-display); font-size: 20px; color: var(--pure-white); margin-bottom: 4px;">${item.title}</h3>
          <p style="font-size: 13px; color: var(--secondary); max-width: 500px;">${item.caption}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="prevLightboxItem()" title="Previous Image">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="btn btn-secondary btn-sm" onclick="nextLightboxItem()" title="Next Image">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    `;
  }
}

function prevLightboxItem() {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxContent();
}

function nextLightboxItem() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
  updateLightboxContent();
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('gallery-lightbox-modal');
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') prevLightboxItem();
      if (e.key === 'ArrowRight') nextLightboxItem();
    }
  });
});

function playDemoVideo() {
  const btn = document.getElementById('btn-play-video');
  const overlay = document.getElementById('video-sim-overlay');
  if (btn) btn.style.display = 'none';
  if (overlay) overlay.style.display = 'flex';
  showToast('Playing highlight reel simulation...', 'info');
}

function pauseDemoVideo() {
  const btn = document.getElementById('btn-play-video');
  const overlay = document.getElementById('video-sim-overlay');
  if (btn) btn.style.display = 'flex';
  if (overlay) overlay.style.display = 'none';
}

function downloadVideoTranscript() {
  const text = `LBEF HOOP FEST 2027 - HIGHLIGHT REEL SHOT LIST & COMMENTARY
Produced by LBEF Media Hub, Maitidevi, Kathmandu

[00:00 - 00:15] Opening overview of Lord Buddha Education Foundation campus, Maitidevi.
[00:15 - 00:30] Player check-in and varsity squad preparation at the registration desk.
[00:30 - 00:48] Fastbreak court action and defensive contests in Maitidevi Arena.
[00:48 - 01:05] Table officials and courtside scorers tracking points and shot clock.
[01:05 - 01:25] Sports Carnival medal honors and podium presentations.
[01:25 - 01:45] Championship trophy celebration with red-jersey varsity squad.

Note: Video reel shot list generated for academic project demonstration.`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "LBEF-HoopFest2027-VideoReelNotes.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded Video Reel Shot List Notes!', 'success');
}

window.filterGallery = filterGallery;
window.openGalleryLightbox = openGalleryLightbox;
window.prevLightboxItem = prevLightboxItem;
window.nextLightboxItem = nextLightboxItem;
window.playDemoVideo = playDemoVideo;
window.pauseDemoVideo = pauseDemoVideo;
window.downloadVideoTranscript = downloadVideoTranscript;
