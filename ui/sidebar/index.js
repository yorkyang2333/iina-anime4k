import "../shared.scss";
import "./sidebar.scss";

const modes = [
  { id: "A", name: "Mode A", desc: "Optimized for 1080p Anime" },
  { id: "B", name: "Mode B", desc: "Optimized for 720p Anime" },
  { id: "C", name: "Mode C", desc: "Optimized for 480p Anime" },
  { id: "A+A", name: "Mode A+A", desc: "Ultra Quality (1080p)" },
  { id: "B+B", name: "Mode B+B", desc: "Ultra Quality (720p)" },
  { id: "C+A", name: "Mode C+A", desc: "Ultra Quality (480p)" }
];

const sidebarMessages = {
  ready: "anime4k:ready",
  applyMode: "anime4k:applyMode",
  setQuality: "anime4k:setQuality",
  setAutoApply: "anime4k:setAutoApply",
  state: "anime4k:state"
};

const legacySidebarMessages = {
  ready: "ready",
  apply: "apply",
  toggleAutoApply: "toggleAutoApply",
  state: "state"
};

let currentState = { mode: "off", quality: "fast", autoApply: true };
let hasState = false;
let hasModernState = false;
let readyTimer = null;
let readyAttempts = 0;
let activeProtocol = "modern";

iina.onMessage(sidebarMessages.state, (data) => {
  hasModernState = true;
  activeProtocol = "modern";
  currentState = data;
  hasState = true;
  stopReadyRetry();
  render();
});

iina.onMessage(legacySidebarMessages.state, (data) => {
  if (!hasModernState) {
    activeProtocol = "legacy";
  }

  currentState = data;
  hasState = true;
  stopReadyRetry();
  render();
});

function applyMode(id) {
  if (activeProtocol === "legacy") {
    iina.postMessage(legacySidebarMessages.apply, { mode: id, quality: currentState.quality });
    return;
  }

  iina.postMessage(sidebarMessages.applyMode, { mode: id });
}

function setQuality(q) {
  if (activeProtocol === "legacy") {
    iina.postMessage(legacySidebarMessages.apply, { mode: currentState.mode, quality: q });
    return;
  }

  iina.postMessage(sidebarMessages.setQuality, { quality: q });
}

function toggleAutoApply(val) {
  if (activeProtocol === "legacy") {
    iina.postMessage(legacySidebarMessages.toggleAutoApply, { autoApply: val });
    return;
  }

  iina.postMessage(sidebarMessages.setAutoApply, { autoApply: val });
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  
  const modeCards = modes.map(m => `
    <div class="mode-card ${currentState.mode === m.id ? 'active' : ''}" data-mode="${m.id}">
      <h3>${m.name}</h3>
      <p>${m.desc}</p>
    </div>
  `).join("");
  
  const html = `
    <div class="sidebar-container">
      <h2>Anime4K</h2>
      <p class="subtitle">Real-time Anime Upscaling</p>
      
      <div class="section">
        <label class="section-title">QUALITY TIER</label>
        <div class="button-group">
          <button class="${currentState.quality === 'fast' ? 'active' : ''}" data-quality="fast">Fast</button>
          <button class="${currentState.quality === 'hq' ? 'active' : ''}" data-quality="hq">HQ</button>
        </div>
      </div>
      
      <div class="section">
        <label class="section-title">PRESETS</label>
        <div class="modes-grid">
          ${modeCards}
        </div>
      </div>
      
      <div class="section">
        <button class="off-button" data-mode="off">Disable Anime4K</button>
      </div>
      
      <div class="section options-section">
        <label class="toggle-label">
          <input type="checkbox" id="auto-apply-check" ${currentState.autoApply ? 'checked' : ''}>
          <span>Auto-Apply to New Videos</span>
        </label>
      </div>
      
    </div>
  `;
  
  app.innerHTML = html;

  app.querySelectorAll("[data-mode]").forEach((el) => {
    el.addEventListener("click", () => {
      applyMode(el.getAttribute("data-mode"));
    });
  });

  app.querySelectorAll("[data-quality]").forEach((el) => {
    el.addEventListener("click", () => {
      setQuality(el.getAttribute("data-quality"));
    });
  });

  const checkbox = document.getElementById("auto-apply-check");
  if (checkbox) {
    checkbox.addEventListener("change", (e) => {
      toggleAutoApply(e.target.checked);
    });
  }
}

function postReady() {
  iina.postMessage(sidebarMessages.ready, {});
  iina.postMessage(legacySidebarMessages.ready, {});
}

function stopReadyRetry() {
  if (readyTimer) {
    clearInterval(readyTimer);
    readyTimer = null;
  }
}

function startReadyRetry() {
  postReady();
  readyTimer = setInterval(() => {
    if (hasState || readyAttempts >= 10) {
      stopReadyRetry();
      return;
    }

    readyAttempts += 1;
    postReady();
  }, 250);
}

// Avoid the timing race condition completely!
var hasInit = false;
function init() {
  if (hasInit) return;
  hasInit = true;
  render();
  startReadyRetry();
}

// In case it's in body, fire immediately if DOM is already parsed
if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", init);
}
