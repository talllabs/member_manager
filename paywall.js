/* ========= paywall.js (Squarespace-safe) ========= */

(function () {
  const GATED_PATH = "/travel-tourism-rfp-hub-beta";
  const AUTH_KEY = "sigmund_rfp_auth";
  const EXP_KEY = "sigmund_rfp_expiry";

  if (!window.location.pathname.startsWith(GATED_PATH)) return;

  function hasAccess() {
    const token = localStorage.getItem(AUTH_KEY);
    const expiry = Number(localStorage.getItem(EXP_KEY));
    return token && expiry && Date.now() < expiry;
  }

  function lockContent() {
    document.querySelectorAll('[data-paywall="locked"]').forEach(el => {
      el.style.display = "none";
    });
  }

  function unlockContent() {
    document.querySelectorAll('[data-paywall="locked"]').forEach(el => {
      el.style.display = "";
    });
  }

  function showOverlay() {
    if (document.getElementById("sigmund-paywall-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "sigmund-paywall-overlay";
    overlay.innerHTML = `
      <div class="sigmund-card">
        <h2>Members Only</h2>
        <p>Access the full Travel & Tourism RFP Hub.</p>

        <input type="email" id="sigmund-email" placeholder="Enter your email" />
        <button id="sigmund-login">Send login link</button>

        <div class="divider">or</div>

        <button id="join-individual">Join Individual</button>
        <button id="join-agency">Join Agency</button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("sigmund-login").onclick = () => {
      const email = document.getElementById("sigmund-email").value.trim();
      if (!email) return alert("Enter a valid email");
      window.sendMagicLink?.(email);
    };

    document.getElementById("join-individual").onclick = () =>
      window.location.href = window.APP_CONFIG.stripe.individualCheckout;

    document.getElementById("join-agency").onclick = () =>
      window.location.href = window.APP_CONFIG.stripe.agencyCheckout;
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
      .sigmund-card {
        background: #fff;
        padding: 32px;
        width: 360px;
        border-radius: 20px;
        text-align: center;
        font-family: Montserrat, sans-serif;
      }
      .sigmund-card h2 { font-size: 26px; margin-bottom: 6px; }
      .sigmund-card p { font-size: 14px; margin-bottom: 16px; }
      .sigmund-card input {
        width: 100%;
        padding: 12px;
        border-radius: 999px;
        border: 1px solid #ccc;
        margin-bottom: 12px;
      }
      .sigmund-card button {
        width: 100%;
        padding: 12px;
        border-radius: 999px;
        background: #000;
        color: #fff;
        border: none;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .divider { font-size: 12px; color: #777; margin: 12px 0; }
    `;
    document.head.appendChild(style);
  }

  function initPaywall() {
    if (hasAccess()) {
      unlockContent();
      return;
    }
    lockContent();
    injectStyles();
    showOverlay();
  }

  /* 🔥 CRITICAL: WAIT FOR SQUARESPACE */
  window.addEventListener("load", () => {
    setTimeout(initPaywall, 300);
  });
})();
