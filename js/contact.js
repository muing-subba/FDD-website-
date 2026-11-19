/**
 * LBEF HOOP FEST 2027 - Contact & Google Maps Integration Module
 * 1. Renders configurable, responsive Google Maps iframe from TOURNAMENT_CONFIG.map
 * 2. Validates the Contact Inquiry form with Vanilla JS FormValidator
 * 3. Sends form details via EmailJS + automatic confirmation reply
 */

let isContactSubmitting = false;

function initCollegeMap() {
  const container = document.getElementById("college-map-embed");
  const directionsBtn = document.getElementById("college-map-directions");
  const addressLabel = document.getElementById("college-map-address-label");
  if (!container) return;

  const mapCfg = (window.TOURNAMENT_CONFIG && window.TOURNAMENT_CONFIG.map) || {
    embedUrl: "",
    collegeName: "Lord Buddha Education Foundation (LBEF)",
    collegeAddress: "Lord Buddha Education Foundation, Maitidevi, Kathmandu 44600, Nepal",
    directionsUrl: "https://maps.google.com/?q=Lord+Buddha+Education+Foundation+Maitidevi+Kathmandu"
  };

  const embedSrc = mapCfg.embedUrl && mapCfg.embedUrl.trim() !== ""
    ? mapCfg.embedUrl.trim()
    : `https://maps.google.com/maps?q=${encodeURIComponent(mapCfg.collegeAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  container.innerHTML = `
    <iframe
      src="${embedSrc}"
      title="Google Map Location for ${mapCfg.collegeName}"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `;

  if (directionsBtn) {
    directionsBtn.href = mapCfg.directionsUrl || `https://maps.google.com/?q=${encodeURIComponent(mapCfg.collegeAddress)}`;
  }

  if (addressLabel) {
    addressLabel.textContent = mapCfg.collegeAddress;
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();
  if (isContactSubmitting) return;

  const form = e.target;
  const submitBtn = document.getElementById("contact-submit-btn");
  const defaultBtnHTML = submitBtn ? submitBtn.innerHTML : "";

  if (window.FormValidator) {
    window.FormValidator.clearStatusBanner("contact-form-status");
    const isValid = window.FormValidator.validateForm(form);
    if (!isValid) {
      window.FormValidator.setStatusBanner(
        "contact-form-status",
        "error",
        "Please fix the highlighted fields before sending your inquiry."
      );
      showToast("Please complete all required fields accurately.", "error");
      return;
    }
  }

  const name = document.getElementById("cnt-name").value.trim();
  const sid = document.getElementById("cnt-sid").value.trim();
  const email = document.getElementById("cnt-email").value.trim();
  const phone = document.getElementById("cnt-phone").value.trim();
  const category = document.getElementById("cnt-category").value;
  const message = document.getElementById("cnt-message").value.trim();

  // Prevent duplicate submission while request is in flight
  isContactSubmitting = true;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add("btn-loading");
    submitBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">hourglass_top</span><span>Sending Inquiry...</span>`;
  }

  const emailResult = await sendTournamentEmails({
    formType: "Contact Inquiry",
    userName: name,
    userEmail: email,
    userPhone: phone,
    studentId: sid || "N/A",
    subject: `[LBEF Hoop Fest Inquiry] ${category}`,
    message,
    detailsSummary: `Name: ${name}\nStudent ID: ${sid || "N/A"}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category}\nMessage:\n${message}`
  });

  isContactSubmitting = false;
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.classList.remove("btn-loading");
    submitBtn.innerHTML = defaultBtnHTML;
  }

  if (!emailResult.ok) {
    if (window.FormValidator) {
      window.FormValidator.setStatusBanner(
        "contact-form-status",
        "error",
        `<strong>Email Delivery Failed:</strong> ${emailResult.error}`
      );
    }
    showToast("Email delivery failed. Please check EmailJS configuration.", "error");
    return;
  }

  // Persist locally after confirmed delivery
  const inquiries = JSON.parse(localStorage.getItem("lbef_inquiries") || "[]");
  inquiries.push({
    name,
    sid,
    email,
    phone,
    category,
    message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem("lbef_inquiries", JSON.stringify(inquiries));

  form.reset();
  if (window.FormValidator) {
    window.FormValidator.setStatusBanner(
      "contact-form-status",
      "success",
      `<strong>Inquiry Sent!</strong> Your message has been delivered to the tournament secretariat and a confirmation email was sent to <strong>${email}</strong>.`
    );
  }
  showToast("Inquiry delivered and confirmation email sent!", "success");
  openModal("modal-contact-confirm");
}

document.addEventListener("DOMContentLoaded", () => {
  initCollegeMap();
});

window.handleContactSubmit = handleContactSubmit;
