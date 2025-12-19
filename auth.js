(function () {
  const key = window.PaywallConfig.access.storageKey;
  const unlocked = localStorage.getItem(key) === "true";
  const lockedSections = document.querySelectorAll('[data-paywall="locked"]');

  if (!unlocked) {
    lockedSections.forEach(el => {
      el.style.display = "none";
    });
    injectGate();
  }

  function injectGate() {
    const gate = document.createElement("section");
    gate.className = "rfp-inline-gate";

    gate.innerHTML = `
      <h2>Choose Your Plan</h2>
      <p class="rfp-gate-sub">
        Find the latest travel & tourism RFPs — curated to help you win more business.
      </p>

      <div class="rfp-gate-plans">
        <div class="rfp-plan">
          <h3>Individual Plan</h3>
          <div class="rfp-price">$229 <span>/year</span></div>
          <p>Perfect for solo consultants or freelancers.</p>
          <button onclick="PaywallStripe.goIndividual()">Start Free Trial</button>
        </div>

        <div class="rfp-plan featured">
          <span class="badge">Popular</span>
          <h3>Agency Plan</h3>
          <div class="rfp-price">$599 <span>/year</span></div>
          <p>Best for agencies, organizations, or teams.</p>
          <button onclick="PaywallStripe.goAgency()">Start Free Trial</button>
        </div>
      </div>

      <p class="rfp-login">Already a member? Login coming next.</p>
    `;

    const target = document.querySelector("#rfp-hub-root");
    if (target) target.parentNode.insertBefore(gate, target);
  }
})();
