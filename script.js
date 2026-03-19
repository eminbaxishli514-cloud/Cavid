(() => {
  const FRIEND_NAME = "Friend"; // Change this to your friend's name
  const SUBTEXT =
    "Today is your day—celebrate big, smile wider, and enjoy every moment.";

  const body = document.body;
  const replayBtn = document.getElementById("replayBtn");
  const nameText = document.getElementById("nameText");
  const subText = document.getElementById("subText");
  const vibeText = document.getElementById("vibeText");

  const tabBtns = Array.from(document.querySelectorAll(".tabBtn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  const VIBES = {
    joy: `May your day feel like pure joy: laughter, comfort, and good surprises.`,
    focus: `Keep your goals loud and your mind calm. Happy Birthday—your future is already winning.`,
    legend: `Today you’re the legend: confident, unstoppable, and surrounded by people who believe in you.`,
  };

  function resetForReplay() {
    // Remove and re-add the class to restart CSS animations reliably.
    body.classList.remove("play");
    // Force style recalculation.
    void body.offsetWidth;
    body.classList.add("play");
  }

  function initText() {
    if (nameText) nameText.textContent = FRIEND_NAME;
    if (subText) subText.textContent = SUBTEXT;

    const nameBig = document.getElementById("nameTextBig");
    const nameMem = document.getElementById("nameTextMem");
    const nameSurprise = document.getElementById("nameTextSurprise");
    if (nameBig) nameBig.textContent = FRIEND_NAME;
    if (nameMem) nameMem.textContent = FRIEND_NAME;
    if (nameSurprise) nameSurprise.textContent = FRIEND_NAME;
  }

  function setVibe(vibeKey) {
    if (!vibeText) return;
    if (!VIBES[vibeKey]) return;
    vibeText.textContent = VIBES[vibeKey];

    const allVibes = Array.from(document.querySelectorAll(".vibeBtn"));
    allVibes.forEach((b) => b.classList.toggle("active", b.dataset.vibe === vibeKey));
  }

  function switchToTab(tabKey) {
    // Update buttons
    tabBtns.forEach((btn) => {
      const isActive = btn.dataset.tab === tabKey;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    // Update panels
    panels.forEach((panel) => {
      const shouldShow =
        (tabKey === "animation" && panel.id === "panel-animation") ||
        (tabKey === "wishes" && panel.id === "panel-wishes") ||
        (tabKey === "memories" && panel.id === "panel-memories") ||
        (tabKey === "surprise" && panel.id === "panel-surprise");
      panel.classList.toggle("active", shouldShow);
    });

    // Replay only makes sense in animation
    if (replayBtn) replayBtn.style.display = tabKey === "animation" ? "" : "none";

    if (tabKey === "animation") {
      // Give the browser a beat to apply initial layout before starting animations.
      requestAnimationFrame(() => resetForReplay());
    }
  }

  function start() {
    initText();

    // Wire tab clicks
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => switchToTab(btn.dataset.tab));
    });

    // Default vibe
    const initialVibeBtn = document.querySelector('.vibeBtn[data-vibe="joy"]');
    if (initialVibeBtn) initialVibeBtn.classList.add("active");
    setVibe("joy");

    // Wire vibe clicks
    document.querySelectorAll(".vibeBtn").forEach((btn) => {
      btn.addEventListener("click", () => setVibe(btn.dataset.vibe));
    });

    // Initial state: animation visible
    switchToTab("animation");
  }

  replayBtn?.addEventListener("click", () => switchToTab("animation"));

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();

