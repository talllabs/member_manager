(function () {
  const script = document.createElement("script");
  script.src = "/paywall/auth.js";
  document.head.appendChild(script);

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "/paywall/styles.css";
  document.head.appendChild(style);
})();
