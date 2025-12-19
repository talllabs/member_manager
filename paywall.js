/* ========= paywall.js ========= */
/* Handles UI overlay + locked content gating */

(function () {
  if (!window.APP_CONFIG) return;

  const PATH = window.APP_CONFIG.site.gatedPath;
  const STORAGE_KEY = "sigmund_rfp_auth";
  const EXPIRY_KEY = "sigmund_rfp_expiry";

  // Only run on gated page
  if (!window.location.pathname.startsWith(PATH)) return;

  function hasValidAccess() {
    const token = localStorage.getItem(STORAGE_KEY);
    const expiry = parseInt(localStorage.getItem(EXPIRY_KEY), 10);
    if (!token || !expiry) return false;
    return Date.now() < expiry;
  }

  function hideLockedContent() {
    document.querySelectorAll('[data-paywall="locked"]').forEach(el => {
      el.style.display = "none";
    });
  }

  function showLockedContent() {
    document.querySelectorAll('[data-paywall="locked"]').forEach(el => {
      el.style.display = "";
    });
  }

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "sigmund-paywall-overlay";

    overlay.innerHTML = `
      <div class="sigmund-paywall-card">
        <h2>Members Only</h2>
        <p>Access the full Travel & Tourism RFP Hub.</p>

        <input
          type="email"
          id="sigmund-login-email"
          placeholder="Enter your email"
          autocomplete="email"
        />

        <button id="sigmund-login-btn">Send login link</button>

        <div class="sigmund-divider">or</div>

        <button id="sigmund-join-individual">Join Individual</button>
        <button id="sigmund-join-agency">Join Agency</button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Login button
    document
      .getElementById("sigmund-login-btn")
      .addEventListener("click", () => {
        const email = document.getElementById("sigmund-login-email").value.trim();
        if (!email) {
          alert("Please enter a valid email.");
          return;
        }
        if (window.sendMagicLink) {
          window.sendMagicLink(email);
        } else {
          alert("Login system not ready yet.");
        }
      });

    // Stripe buttons
    document
      .getElementById("sigmund-join-individual")
      .addEventListener("click", () => {
        window.location.href =
          window.APP_CONFIG.stripe.individualCheckout;
      });

    document
      .getElementById("sigmund-join-agency")
      .addEventListener("click", () => {
        window.location.href =
          window.APP_CONFIG.stripe.agencyCheckout;
      });
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      #sigmund-paywall-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
      }

      .sigmund-paywall-card {
        background: #ffffff;
        padding: 32px;
        width: 360px;
        max-width: 90%;
        border-radius: 18px;
        text-align: center;
        box-shadow: 0 30px 60px rgba(0,0,0,0.25);
        font-family: Montserrat, sans-serif;
      }

      .sigmund-paywall-card h2 {
        margin: 0 0 8px;
        font-size: 26px;
      }

      .sigmund-paywall-card p {
        font-size: 14px;
        margin-bottom: 18px;
        color: #555;
      }

      .sigmund-paywall-card input {
        width: 100%;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 999px;
        border: 1px solid #ddd;
        font-size: 14px;
      }

      .sigmund-paywall-card button {
        width: 100%;
        padding: 12px;
        border-radius: 999px;
        border: none;
        margin-bottom: 10px;
        font-size: 14px;
        cursor: pointer;
        background: #000;
        color: #fff;
      }

      .sigmund-divider {
        margin: 12px 0;
        font-size: 12px;
        color: #888;
      }
    `;
    document.head.appendChild(style);
  }

  // INIT
  if (hasValidAccess()) {
    showLockedContent();
  } else {
    hideLockedContent();
    injectStyles();
    createOverlay();
  }
})();
