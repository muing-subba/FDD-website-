/**
 * LBEF HOOP FEST 2027 - Vanilla JavaScript Form Validation Engine
 * Enforces:
 * - Non-empty Name & required fields
 * - Valid Email format
 * - Phone number containing exactly 10 digits
 * - Clear error messages & invalid field highlighting
 * - Automatic error removal as users correct inputs
 */

(function (window) {
  "use strict";

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_10_DIGITS_REGEX = /^\d{10}$/;

  function findErrorElement(field) {
    if (!field) return null;
    const explicitId = field.getAttribute("data-error-id");
    if (explicitId) {
      return document.getElementById(explicitId);
    }
    const group = field.closest(".form-group");
    if (group) {
      let errEl = group.querySelector(".error-text");
      if (!errEl) {
        errEl = document.createElement("span");
        errEl.className = "error-text";
        group.appendChild(errEl);
      }
      return errEl;
    }
    return null;
  }

  function showFieldError(field, message) {
    if (!field) return;
    field.classList.add("error");
    field.setAttribute("aria-invalid", "true");
    const errEl = findErrorElement(field);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add("visible");
      errEl.style.display = "block";
    }
  }

  function clearFieldError(field) {
    if (!field) return;
    field.classList.remove("error");
    field.removeAttribute("aria-invalid");
    const errEl = findErrorElement(field);
    if (errEl) {
      errEl.classList.remove("visible");
      errEl.style.display = "none";
    }
  }

  function validateField(field) {
    if (!field) return true;
    const val = (field.value || "").trim();
    const type = (field.getAttribute("data-validate") || field.type || "").toLowerCase();
    const isRequired = field.hasAttribute("required") || field.getAttribute("data-required") === "true";

    if (field.type === "checkbox") {
      if (isRequired && !field.checked) {
        showFieldError(field, field.getAttribute("data-required-msg") || "Please check this required box to proceed.");
        return false;
      }
      clearFieldError(field);
      return true;
    }

    if (isRequired && val.length === 0) {
      const labelText = field.getAttribute("data-label") || "This field";
      showFieldError(field, `${labelText} cannot be empty.`);
      return false;
    }

    if (val.length > 0) {
      if (type === "name") {
        if (val.length < 2) {
          showFieldError(field, "Please enter a valid name (at least 2 characters).");
          return false;
        }
      } else if (type === "email") {
        if (!EMAIL_REGEX.test(val)) {
          showFieldError(field, "Please enter a valid email address (e.g. name@example.com).");
          return false;
        }
      } else if (type === "phone" || type === "tel") {
        if (!PHONE_10_DIGITS_REGEX.test(val)) {
          showFieldError(field, "Phone number must contain exactly 10 digits (e.g. 9801234567).");
          return false;
        }
      } else if (type === "number") {
        const num = Number(val);
        const min = field.min !== "" ? Number(field.min) : -Infinity;
        const max = field.max !== "" ? Number(field.max) : Infinity;
        if (Number.isNaN(num) || num < min || num > max) {
          showFieldError(field, `Please enter a valid number between ${min} and ${max}.`);
          return false;
        }
      }
    }

    clearFieldError(field);
    return true;
  }

  function attachLiveClearing(form) {
    if (!form || form.dataset.validationAttached === "true") return;
    form.dataset.validationAttached = "true";

    const handler = (event) => {
      const target = event.target;
      if (!target || !target.matches("input, select, textarea")) return;
      if (target.classList.contains("error") || target.getAttribute("aria-invalid") === "true") {
        validateField(target);
      }
    };

    form.addEventListener("input", handler);
    form.addEventListener("change", handler);
  }

  function validateForm(form) {
    if (!form) return false;
    attachLiveClearing(form);

    const fields = form.querySelectorAll("input, select, textarea");
    let firstInvalid = null;
    let allValid = true;

    fields.forEach((field) => {
      if (field.disabled || field.type === "hidden") return;
      const valid = validateField(field);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return allValid;
  }

  function setStatusBanner(bannerId, type, message) {
    const banner = document.getElementById(bannerId);
    if (!banner) return;
    banner.className = `form-status-banner visible ${type}`;
    const iconName = type === "success" ? "check_circle" : (type === "error" ? "error" : "info");
    banner.innerHTML = `
      <span class="material-symbols-outlined" style="font-size: 20px; flex-shrink: 0;">${iconName}</span>
      <div>${message}</div>
    `;
  }

  function clearStatusBanner(bannerId) {
    const banner = document.getElementById(bannerId);
    if (!banner) return;
    banner.className = "form-status-banner";
    banner.innerHTML = "";
  }

  // Auto-attach live clearing on DOMContentLoaded for all forms
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-validate-form]").forEach(attachLiveClearing);
  });

  window.FormValidator = {
    EMAIL_REGEX,
    PHONE_10_DIGITS_REGEX,
    validateField,
    validateForm,
    showFieldError,
    clearFieldError,
    attachLiveClearing,
    setStatusBanner,
    clearStatusBanner
  };
})(window);
