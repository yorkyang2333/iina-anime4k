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

let currentState = { mode: "off", quality: "fast", autoApply: true };

iina.onMessage("state", (data) => {
  currentState = data;
  render();
});

function applyMode(id) {
  iina.postMessage("apply", { mode: id, quality: currentState.quality });
}

function updateQuality(q) {
  iina.postMessage("apply", { mode: currentState.mode, quality: q });
}

function toggleAutoApply(val) {
  iina.postMessage("toggleAutoApply", { autoApply: val });
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
}

document.addEventListener("click", function(e) {
  if (!e.target || !e.target.closest) return;
  var modeBtn = e.target.closest('[data-mode]');
  if (modeBtn) return applyMode(modeBtn.getAttribute('data-mode'));
  var qualBtn = e.target.closest('[data-quality]');
  if (qualBtn) return updateQuality(qualBtn.getAttribute('data-quality'));
});

document.addEventListener("change", function(e) {
  if (e.target && e.target.id === 'auto-apply-check') {
    toggleAutoApply(e.target.checked);
  }
});

// Avoid the timing race condition completely!
var hasInit = false;
function init() {
  if (hasInit) return;
  hasInit = true;
  iina.postMessage("ready", {});
}

// In case it's in body, fire immediately if DOM is already parsed
if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", init);
}
