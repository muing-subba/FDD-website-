/**
 * LBEF HOOP FEST 2027 - Resources & Document Downloads Module
 */

let activeCat = 'all';

function setResourceCat(cat, btn) {
  activeCat = cat;
  document.querySelectorAll('.res-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterResources();
}

function filterResources() {
  const searchEl = document.getElementById('resource-search');
  const query = (searchEl ? searchEl.value : '').toLowerCase().trim();
  const cards = document.querySelectorAll('.resource-card');

  cards.forEach(card => {
    const cat = card.getAttribute('data-cat');
    const text = (card.getAttribute('data-title') || '').toLowerCase();

    const matchCat = (activeCat === 'all' || cat === activeCat);
    const matchQuery = (!query || text.includes(query));

    card.style.display = (matchCat && matchQuery) ? 'flex' : 'none';
  });
}

const DOCS_DATA = {
  rulebook: {
    title: "Official FIBA Tournament Rulebook 2027",
    format: "PDF Document (assets/downloads/official-rulebook-2026.pdf)",
    content: `LBEF HOOP FEST 2027 - OFFICIAL BASKETBALL REGULATION CODE
Published by Lord Buddha Education Foundation Athletic Advisory Board
In Affiliation with Asia Pacific University (APU), Malaysia.

1. TOURNAMENT SANCTION & JURISDICTION
All matches adhere strictly to official FIBA regulations.
Venue: Maitidevi Arena, Lord Buddha Education Foundation, Kathmandu, Nepal.

2. GAME TIMING & TIMEOUTS
- Four (4) periods of 10 minutes stop-clock.
- 24-second shot clock; resets to 14 seconds on offensive rebound.
- Halftime interval: 10 minutes.
- Timeouts: 2 in the first half, 3 in the second half, 1 in each overtime period.

3. ROSTER SPECIFICATIONS
- Minimum 5 active players on court; maximum 10 players per squad.
- All roster athletes must present physical LBEF or APU campus ID before tip-off.`
  },
  brochure: {
    title: "LBEF Hoop Fest 2027 Championship Event Brochure",
    format: "PDF Brochure (assets/downloads/tournament-brochure-2026.pdf)",
    content: `WELCOME TO LBEF HOOP FEST 2027
Theme: "One Court. One Team. One Victory."
Dates: October 25 - 30, 2027
Venue: Maitidevi Arena, Kathmandu, Nepal

HIGHLIGHTS:
- 16 Inter-Faculty Teams competing across 32 clashes.
- Grand Championship Prize Pool of NPR 150,000.
- Invitational exhibition from Asia Pacific University (APU), Malaysia.
- 3v3 Express Slam and 3-Point Shootout Contests.`
  },
  captain_handbook: {
    title: "Captain's Registration & Technical Handbook",
    format: "PDF Handbook (assets/downloads/captains-handbook-2026.pdf)",
    content: `LBEF HOOP FEST 2027 - TEAM CAPTAINS HANDBOOK

CHECKLIST FOR TEAM CAPTAINS:
1. Online Roster Submission: Finalize 5 to 10 athletes before October 18, 2027 (11:59 PM).
2. Uniform Regulations: Matching light (home) and dark (away) jerseys with clearly printed numbers.
3. Technical Meeting: Mandatory captain & coach meeting on October 23, 2027 at 10:00 AM in Maitidevi Hall B.
4. Court Check-in: Report to table officials at least 30 minutes prior to scheduled tip-off.`
  },
  eligibility: {
    title: "Player Eligibility & Verification Checklist",
    format: "PDF Checklist (assets/downloads/player-eligibility-checklist-2026.pdf)",
    content: `LBEF ATHLETIC COUNCIL - PLAYER ELIGIBILITY AUDIT

CRITERIA REQUIRED:
[X] Enrolled full-time at LBEF or recognized APU collaborative program.
[X] Valid Student Smart Card with verified Roll Number.
[X] Minimum 2.0 GPA in preceding academic semester.
[X] Medical fitness clearance and liability waiver signed.
[X] No active professional league contracts during tournament window.`
  },
  volunteer_guide: {
    title: "Volunteer Operations Handbook",
    format: "PDF Guide (assets/downloads/volunteer-handbook-2026.pdf)",
    content: `LBEF HOOP FEST 2027 - VOLUNTEER CREW GUIDE

DUTIES & REPORTING:
- Shift Timings: Morning Shift (08:30 - 13:00) / Afternoon Shift (13:00 - 18:30).
- Court Crew: Maintain dry, slip-free hardwood floor during game timeouts and halftime.
- Table Officials: Assist FIBA certified referees with electronic scoreboards and 24s shot clock.
- Hospitality: Welcome visiting teams, dignitaries, and APU delegates.`
  },
  medical_plan: {
    title: "Emergency & Medical Action Plan",
    format: "PDF Protocol (assets/downloads/medical-emergency-protocol-2026.pdf)",
    content: `SPORTS MEDICINE PROTOCOL - MAITIDEVI ARENA

1. ONSITE FIRST AID:
Located adjacent to Court 1 players tunnel. Stocked with AED defibrillators, ice packs, compression bandages, and stretcher.

2. CERTIFIED PHYSIOTHERAPISTS:
Two sports physical therapists on duty throughout all match windows.

3. EMERGENCY DISPATCH:
Emergency Ambulance on standby outside Gate 2. Direct Hotline: +977-9801234567.`
  },
  schedule_csv: {
    title: "Official Match Schedule (CSV)",
    format: "CSV Dataset (assets/downloads/tournament-schedule-2026.csv)",
    content: `Match ID,Date,Time (NPT),Round,Court,Matchup,Status
CER-01,2027-10-25,08:30 AM,Ceremony,Court 1 - Main Arena,Opening Ceremony & Parade,Completed
M01,2027-10-25,10:00 AM,Group Stage,Court 1 - Main Arena,Cyber Warriors vs Cloud Hawks,Completed (78-65)
M02,2027-10-25,12:30 PM,Group Stage,Court 2 - East Wing,KTM Dunkers vs Apex Legends,Completed (82-70)
M05,2027-10-26,11:00 AM,Round of 16,Court 1 - Main Arena,Cyber Warriors vs Tech Titans,Live
M13,2027-10-30,03:30 PM,Final,Court 1 - Main Arena,Championship Grand Finale,Upcoming`
  },
  recap_report: {
    title: "Tournament Statistical Recap Report",
    format: "PDF Report (assets/downloads/tournament-recap-report-2026.pdf)",
    content: `LBEF HOOP FEST - CHAMPIONSHIP STATISTICAL RECAP REPORT
Published by LBEF Athletic Secretariat

1. HISTORICAL CHAMPIONS:
- 2025: Cyber Warriors (Faculty of IT)
- 2024: KTM Dunkers (Business School)
- 2023: APU Exchange All-Stars

2. ALL-TIME RECORDS:
- Single Game High: Aayush Shrestha (34 PTS)
- Tournament 3-Point Accuracy: 43.2%
- Highest Attendance: 1,450 Spectators at Maitidevi Arena`
  }
};

function downloadDoc(docKey) {
  const doc = DOCS_DATA[docKey];
  downloadTournamentFile(docKey, doc ? doc.content : '', `LBEF-HoopFest2027-${docKey}.txt`);
}

function previewDoc(docKey) {
  const doc = DOCS_DATA[docKey];
  if (!doc) return;

  const content = document.getElementById('doc-preview-content');
  if (content) {
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="badge-tag" style="background: rgba(255,87,34,0.2); color: var(--court-orange);">${doc.format}</span>
      </div>
      <h3 style="font-family: var(--font-display); font-size: 20px; color: var(--pure-white); margin-bottom: 12px;">${doc.title}</h3>
      <pre style="background: var(--surface-low); border: 1px solid var(--court-border); padding: 16px; border-radius: var(--radius-sm); font-size: 12px; color: var(--secondary); white-space: pre-wrap; font-family: monospace; max-height: 340px; overflow-y: auto; line-height: 1.6;">${doc.content}</pre>
      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal('modal-doc-preview')">Close</button>
        <button type="button" class="btn btn-primary btn-sm" onclick="downloadDoc('${docKey}')">
          <span class="material-symbols-outlined" style="font-size: 16px;">download</span>
          <span>Download Full File</span>
        </button>
      </div>
    `;
  }
  openModal('modal-doc-preview');
}

window.setResourceCat = setResourceCat;
window.filterResources = filterResources;
window.downloadDoc = downloadDoc;
window.previewDoc = previewDoc;
