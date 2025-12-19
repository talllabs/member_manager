(function () {
  const cfg = window.PaywallConfig;
  const key = cfg.access.storageKey;
  const ttl = cfg.access.ttlDays * 24 * 60 * 60 * 1000;

  const record = JSON.parse(localStorage.getItem(key) || "{}");
  const valid = record.expires && record.expires > Date.now();

  const locked = document.querySelectorAll('[data-paywall="locked"]');

  if (!valid) {
    locked.forEach(el => (el.style.display = "none"));
    showOverlay();
  }

  function grantAccess() {
    localStorage.setItem(
      key,
      JSON.stringify({ expires: Date.now() + ttl })
    );
    location.reload();
  }

  function showOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "paywall-overlay";

    overlay.innerHTML = `
      <div class="paywall-box">
        <h2>Members Only</h2>
        <p>Access the full Travel & Tourism RFP Hub.</p>

        <input id="paywall-email" type="email" placeholder="Enter your email" />
        <button id="send-link">Send login link</button>

        <div class="divider">or</div>

        <button onclick="window.location.href='${cfg.stripe.individualPlanUrl}'">
          Join Individual
        </button>

        <button onclick="window.location.href='${cfg.stripe.agencyPlanUrl}'">
          Join Agency
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("send-link").onclick = sendMagicLink;
  }

  function sendMagicLink() {
    const email = document.getElementById("paywall-email").value;
    if (!email) return alert("Enter an email");

    const token = btoa(email + "|" + Date.now());
    const magicLink =
      window.location.origin +
      cfg.pagePath +
      "?token=" +
      encodeURIComponent(token);

    emailjs.send(
      cfg.email.serviceId,
      cfg.email.templateId,
      { magic_link: magicLink },
      cfg.email.publicKey
    );

    alert("Check your email for your login link.");
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("token")) {
    grantAccess();
  }
})();
