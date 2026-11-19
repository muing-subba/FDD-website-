/**
 * LBEF HOOP FEST 2027 - CENTRAL CONFIGURATION FILE
 * ---------------------------------------------------------------------------
 * Edit this file to insert your own:
 *   1. EmailJS public credentials & recipient email (EMAILJS_CONFIG)
 *   2. College Google Maps embed URL or exact address (MAP_CONFIG)
 *   3. Local downloadable resource file paths (DOWNLOAD_CONFIG)
 * ---------------------------------------------------------------------------
 */

window.TOURNAMENT_CONFIG = {
  /**
   * 1. EMAILJS CONFIGURATION (Public Client-Side Identifiers Only)
   * Sign up at https://www.emailjs.com/ to obtain your Public Key, Service ID,
   * and Template ID(s). Do NOT place any private keys or secrets here.
   *
   * Template parameter names sent on submission:
   * - from_name, user_name, user_email, reply_to, user_phone
   * - to_email (configured recipient email or user's email for auto-reply)
   * - form_type ("Team Registration" | "Volunteer Application" | "Contact Inquiry")
   * - subject, team_name, faculty, student_id, registration_id, message, details_summary
   */
  emailjs: {
    PUBLIC_KEY: "YOUR_EMAILJS_PUBLIC_KEY",
    SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
    // Main template: sends submitted form details to your configured RECIPIENT_EMAIL
    TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID",
    // Optional second template: sends automatic confirmation reply to user's email.
    // Leave as placeholder if you handle Auto-Reply directly inside EmailJS Dashboard's Auto-Reply tab.
    AUTO_REPLY_TEMPLATE_ID: "YOUR_EMAILJS_AUTOREPLY_TEMPLATE_ID",
    // Your tournament secretariat / admin recipient email address
    RECIPIENT_EMAIL: "YOUR_RECIPIENT_EMAIL@example.com"
  },

  /**
   * 2. GOOGLE MAPS CONFIGURATION
   * Option A: Paste your exact Google Maps "Embed a map" iframe URL into `embedUrl`
   *           (e.g., "https://www.google.com/maps/embed?pb=...")
   * Option B: Leave `embedUrl` empty ("") and update `collegeAddress` with your
   *           college's exact address or coordinates; the map iframe will generate automatically.
   */
  map: {
    embedUrl: "",
    collegeName: "Lord Buddha Education Foundation (LBEF)",
    collegeAddress: "Lord Buddha Education Foundation, Maitidevi, Kathmandu 44600, Nepal",
    directionsUrl: "https://maps.google.com/?q=Lord+Buddha+Education+Foundation+Maitidevi+Kathmandu"
  },

  /**
   * 3. DOWNLOADABLE RESOURCES CONFIGURATION
   * Replace any file inside `assets/downloads/` with your own PDF, DOCX, CSV, or TXT file
   * and update the path/filename below if you change the filename.
   */
  downloads: {
    rulebook: {
      url: "assets/downloads/official-rulebook-2026.pdf",
      filename: "LBEF-HoopFest2027-Official-Rulebook.pdf",
      title: "Official FIBA Tournament Rulebook 2027"
    },
    brochure: {
      url: "assets/downloads/tournament-brochure-2026.pdf",
      filename: "LBEF-HoopFest2027-Event-Brochure.pdf",
      title: "LBEF Hoop Fest 2027 Championship Brochure"
    },
    captain_handbook: {
      url: "assets/downloads/captains-handbook-2026.pdf",
      filename: "LBEF-HoopFest2027-Captains-Handbook.pdf",
      title: "Captain's Registration & Technical Handbook"
    },
    eligibility: {
      url: "assets/downloads/player-eligibility-checklist-2026.pdf",
      filename: "LBEF-HoopFest2027-Player-Eligibility-Checklist.pdf",
      title: "Player Eligibility & Verification Checklist"
    },
    volunteer_guide: {
      url: "assets/downloads/volunteer-handbook-2026.pdf",
      filename: "LBEF-HoopFest2027-Volunteer-Handbook.pdf",
      title: "Volunteer Operations Handbook"
    },
    medical_plan: {
      url: "assets/downloads/medical-emergency-protocol-2026.pdf",
      filename: "LBEF-HoopFest2027-Medical-Protocol.pdf",
      title: "Emergency & Medical Action Plan"
    },
    schedule_csv: {
      url: "assets/downloads/tournament-schedule-2026.csv",
      filename: "LBEF-HoopFest2027-Match-Schedule.csv",
      title: "Official Match Schedule (CSV)"
    },
    prospectus: {
      url: "assets/downloads/sponsorship-prospectus-2026.pdf",
      filename: "LBEF-HoopFest2027-Sponsorship-Prospectus.pdf",
      title: "Sponsorship & Partnership Prospectus"
    },
    recap_report: {
      url: "assets/downloads/tournament-recap-report-2026.pdf",
      filename: "LBEF-HoopFest2027-Recap-Report.pdf",
      title: "Tournament Statistical Recap Report"
    }
  }
};
