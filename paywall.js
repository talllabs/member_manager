(function () {
  const base = document.currentScript.src.replace("paywall.js", "");

  ["stripe.js", "auth.js"].forEach(file => {
    const s = document.createElement("script");
    s.src = base + file;
    s.defer = true;
    document.head.appendChild(s);
  });

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "styles.css";
  document.head.appendChild(css);
})();
