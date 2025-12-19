(function () {
  const key = window.PaywallConfig.access.storageKey;
  const hasAccess = localStorage.getItem(key) === "true";

  const locked = document.querySelectorAll('[data-paywall="locked"]');

  if (!hasAccess) {
    locked.forEach(el => el.style.display = "none");
    showPaywall();
  }

  function showPaywall() {
    const overlay = document.createElement("div");
    overlay.id = "paywall-overlay";
    overlay.innerHTML = `
      <div class="paywall-box">
        <h2>Members Only</h2>
        <button onclick="PaywallStripe.goIndividual()">Join Individual</button>
        <button onclick="PaywallStripe.goAgency()">Join Agency</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
})();
