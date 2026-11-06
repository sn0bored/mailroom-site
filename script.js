// Small progressive enhancements. The page works without this file.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var svg = document.querySelector(".route-svg");

  function applyMotion() {
    if (!svg || typeof svg.pauseAnimations !== "function") return;
    if (reduce.matches) { svg.pauseAnimations(); } else { svg.unpauseAnimations(); }
  }
  applyMotion();
  if (reduce.addEventListener) reduce.addEventListener("change", applyMotion);

  // Cycle the example addresses on the incoming envelopes.
  var samples = ["hello@example.org", "billing@example.net", "press@example.co", "support@example.org", "jobs@example.net", "team@example.co"];
  var labels = document.querySelectorAll("[data-cycle]");
  if (labels.length && !reduce.matches) {
    var i = 0;
    setInterval(function () {
      labels.forEach(function (el, n) {
        el.textContent = samples[(i + n) % samples.length];
      });
      i += 1;
    }, 2600);
  }

  // Copy buttons on code blocks.
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy"));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(function () {
        var was = button.textContent;
        button.textContent = "Copied";
        setTimeout(function () { button.textContent = was; }, 1600);
      }).catch(function () {});
    });
  });
})();
