(function () {
  // Detect base path from this script's URL
  const currentScript = document.currentScript;
  const basePath = currentScript.src.replace("paywall.js", "");

  // Load required JS files
  const scripts = [
    basePath + "stripe.js",
    basePath + "auth.js"
  ];

  scripts.forEach(src => {
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  });

  // Load stylesheet
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = basePath + "styles.css";
  document.head.appendChild(style);
})();
