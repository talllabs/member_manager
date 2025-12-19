/* ========= auth.js ========= */
/* Magic-link auth for Sigmund RFP Hub */
/* 30-day access using EmailJS */

(function () {
  const STORAGE_KEY = "rfp_magic_auth";
  const EXPIRY_DAYS = 30;

  /* ---------- helpers ---------- */

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function generateToken() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10)
    );
  }

  function saveAuth(token) {
    const expiresAt =
      Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token, expiresAt })
    );
  }

  function getAuth() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function isAuthed() {
    const data = getAuth();
    return data && Date.now() < data.expiresAt;
  }

  function clearAuth() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /* ---------- magic link handling ---------- */

  const incomingToken = getQueryParam("token");

  if (incomingToken) {
    saveAuth(incomingToken);

    // Clean URL (remove token)
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
  }

  /* ---------- expose helpers for paywall ---------- */

  window.SigmundAuth = {
    isAuthed,
    logout: () => {
      clearAuth();
      window.location.reload();
    },
  };

  /* ---------- send magic link ---------- */

  window.sendMagicLink = function (email) {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const token = generateToken();
    const magicLink =
      window.location.origin +
      window.location.pathname +
      "?token=" +
      encodeURIComponent(token);

    emailjs
      .send(
        window.APP_CONFIG.email.serviceId,
        window.APP_CONFIG.email.templateId,
        {
          email: email,
          magic_link: magicLink,
        },
        window.APP_CONFIG.email.publicKey
      )
      .then(() => {
        alert(
          "Check your email for your secure login link. It will be valid for 30 days."
        );
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        alert(
          "Something went wrong sending the login link. Please try again."
        );
      });
  };
})();
