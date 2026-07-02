import "../shared.scss";
import "./sidebar.scss";

import { t, setLocale, getLocale, getModes, localeNames, detectSystemLocale } from "../../src/i18n";

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

let currentState = { mode: "off", quality: "fast", autoApply: true, lang: "auto" };
let hasState = false;
let hasModernState = false;
let readyTimer = null;
let readyAttempts = 0;
let activeProtocol = "modern";

iina.onMessage(sidebarMessages.state, (data) => {
  hasModernState = true;
  activeProtocol = "modern";
  currentState = data;
  if (data && data.lang) {
    setLocale(data.lang);
  }
  hasState = true;
  stopReadyRetry();
  render();
});

iina.onMessage(legacySidebarMessages.state, (data) => {
  if (!hasModernState) {
    activeProtocol = "legacy";
  }

  currentState = data;
  if (data && data.lang) {
    setLocale(data.lang);
  }
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
  
  const currentModes = getModes();
  const modeCards = currentModes.map(m => `
    <div class="mode-card ${currentState.mode === m.id ? 'active' : ''}" data-mode="${m.id}">
      <h3>${m.name}</h3>
      <p>${m.desc}</p>
    </div>
  `).join("");
  
  const sysLang = detectSystemLocale();
  const sysName = localeNames[sysLang] || sysLang;
  const langOptions = Object.entries(localeNames).map(([code, name]) => {
    return `<option value="${code}" ${currentState.lang === code ? 'selected' : ''}>${name}</option>`;
  }).join("");

  const html = `
    <div class="sidebar-container">
      <h2>${t("pluginName")}</h2>
      <p class="subtitle">${t("subtitle")}</p>
      
      <div class="section">
        <label class="section-title">${t("qualityTier")}</label>
        <div class="button-group">
          <button class="${currentState.quality === 'fast' ? 'active' : ''}" data-quality="fast">${t("fast")}</button>
          <button class="${currentState.quality === 'hq' ? 'active' : ''}" data-quality="hq">${t("hq")}</button>
        </div>
      </div>
      
      <div class="section">
        <label class="section-title">${t("presets")}</label>
        <div class="modes-grid">
          ${modeCards}
        </div>
      </div>
      
      <div class="section">
        <button class="off-button" data-mode="off">${t("disable")}</button>
      </div>
      
      <div class="section options-section">
        <label class="toggle-label">
          <input type="checkbox" id="auto-apply-check" ${currentState.autoApply ? 'checked' : ''}>
          <span>${t("autoApply")}</span>
        </label>
        <div class="lang-select-wrapper" style="margin-top: 14px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 12px;">
          <span style="font-size: 13px; opacity: 0.8;">${t("language")}</span>
          <select id="lang-select" style="padding: 4px 8px; border-radius: 4px; background: rgba(0, 0, 0, 0.3); color: inherit; border: 1px solid rgba(255, 255, 255, 0.2); outline: none; font-size: 12px;">
            <option value="auto" ${currentState.lang === 'auto' || !currentState.lang ? 'selected' : ''}>${t("auto")} (${sysName})</option>
            ${langOptions}
          </select>
        </div>
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

  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      const newLang = e.target.value;
      setLocale(newLang);
      render();
      if (activeProtocol === "legacy") {
        iina.postMessage("setLang", { lang: newLang });
      } else {
        iina.postMessage("anime4k:setLang", { lang: newLang });
      }
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
