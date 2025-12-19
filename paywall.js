(function () {
  const cfg = window.PaywallConfig;
  if (!cfg) return;
  if (window.location.pathname !== cfg.pagePath) return;

  const {
    accessKey,
    emailKey,
    expiryKey,
    durationDays
  } = cfg.access;

  const now = Date.now();

  function isValid() {
    const exp = parseInt(localStorage.getItem(expiryKey), 10);
    return exp && now < exp;
  }

  const url = new URL(window.location.href);
  const magic = url.searchParams.get("magic");
  const exp = url.searchParams.get("exp");

  if (magic && exp && now < parseInt(exp, 10)) {
    localStorage.setItem(accessKey, "true");
    localStorage.setItem(expiryKey, exp);

    url.searchParams.delete("magic");
    url.searchParams.delete("exp");
    history.replaceState({}, document.title, url.pathname);
  }

  if (localStorage.getItem(accessKey) === "true" && isValid()) return;

  document.body.style.overflow = "hidden";

  const el = document.createElement("div");
  el.id = "sigmund-paywall";
  el.innerHTML = `
    <div class="sigmund-backdrop"></div>
    <div class="sigmund-modal">
      <h2>Members Only</h2>
      <p>Get secure 30-day access to the Travel & Tourism RFP Hub.</p>

      <input type="email" id="sigmund-email" placeholder="Enter your email" />

      <button id="send-magic">Send Magic Link</button>

      <div class="divider">or</div>

      <a href="${cfg.stripe.individual}" class="pay">Join Individual</a>
      <a href="${cfg.stripe.agency}" class="pay">Join Agency</a>
    </div>
  `;

  document.body.appendChild(el);

  document.getElementById("send-magic").onclick = function () {
    const email = document.getElementById("sigmund-email").value.trim();
    if (!email || !email.includes("@")) {
      alert("Enter a valid email.");
      return;
    }

    const expiry = now + durationDays * 86400000;
    const magicLink =
      window.location.origin +
      cfg.pagePath +
      "?magic=" +
      btoa(email.toLowerCase()).replace(/=/g, "") +
      "&exp=" +
      expiry;

    localStorage.setItem(emailKey, email);
    localStorage.setItem(expiryKey, expiry);

    emailjs.send(
      cfg.emailjs.serviceId,
      cfg.emailjs.templateId,
      {
        to_email: email,
        magic_link: magicLink,
        days: durationDays
      }
    );

    alert("Magic link sent. Check your inbox.");
  };
})();
