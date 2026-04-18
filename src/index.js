import { shadersData } from "./shaders-data";
import { presets, modes } from "./shaders";

const { core, event, menu, mpv, console, file, utils, preferences, sidebar, overlay } = iina;

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

console.log("Anime4K Plugin is loading...");

// 1. Install shaders to @data/ directory on startup
function installShaders() {
  const testShader = "Anime4K_Clamp_Highlights.glsl";
  const testPath = utils.resolvePath(`@data/${testShader}`);
  
  if (!file.exists(testPath)) {
    console.log("Installing shaders to @data/...");
    for (const [name, content] of Object.entries(shadersData)) {
      const p = utils.resolvePath(`@data/${name}`);
      file.write(p, content);
    }
    console.log("Shaders installed successfully.");
  }
}

installShaders();

// 2. State Management
let currentQuality = preferences.get("quality") || "fast"; // "fast" or "hq"
let currentMode = preferences.get("mode") || "off"; // "A", "B", "off", etc
let autoApply = preferences.get("autoApply") !== false;

function saveState() {
  preferences.set("quality", currentQuality);
  preferences.set("mode", currentMode);
  preferences.set("autoApply", autoApply);
  preferences.sync();
}

function showOSD(text) {
  core.osd(text);
  
  // Also send to overlay if it's visible, or just rely on core OSD.
  // The plan called for an overlay, but IINA's core.osd is perfect for this.
  // Let's use core.osd for simplicity and native feel.
}

function sendSidebarState() {
  const state = {
    mode: currentMode,
    quality: currentQuality,
    autoApply: autoApply
  };

  console.log(`Anime4K sidebar: post state ${JSON.stringify(state)}`);
  sidebar.postMessage(sidebarMessages.state, state);
  sidebar.postMessage(legacySidebarMessages.state, state);
}

function applyShader(mode, quality = currentQuality) {
  try {
    console.log(`Anime4K sidebar: applyShader ${mode} / ${quality}`);

    if (mode === "off") {
      mpv.command("change-list", ["glsl-shaders", "clr", ""]);
      showOSD("Anime4K: Off");
      currentMode = "off";
      saveState();
      updateMenu();
      sendSidebarState();
      return true;
    }

    const shaderList = presets[quality] && presets[quality][mode];
    if (!shaderList) {
      throw new Error(`Invalid mode/quality: ${mode} / ${quality}`);
    }

    const paths = shaderList.map(s => utils.resolvePath(`@data/${s}`)).join(":");
    mpv.command("change-list", ["glsl-shaders", "set", paths]);

    const qualityText = quality === "hq" ? "HQ" : "Fast";
    showOSD(`Anime4K: Mode ${mode} (${qualityText})`);

    currentMode = mode;
    currentQuality = quality;
    saveState();
    updateMenu();
    sendSidebarState();
    return true;
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.error(`Anime4K: Failed to apply shader: ${message}`);
    showOSD("Anime4K: Failed to apply shader");
    sendSidebarState();
    return false;
  }
}

function setQuality(quality) {
  if (!presets[quality]) {
    console.error(`Anime4K: Invalid quality tier: ${quality}`);
    sendSidebarState();
    return;
  }

  if (currentMode !== "off") {
    applyShader(currentMode, quality);
    return;
  }

  currentQuality = quality;
  saveState();
  updateMenu();
  sendSidebarState();
}

function setAutoApply(value) {
  autoApply = value;
  saveState();
  updateMenu();
  sendSidebarState();
}

// 3. Menu System
let presetMenuItems = [];

function updateMenu() {
  // We recreate or update the menu items
  // Since IINA plugin API doesn't easily allow dynamic recreation of the whole menu unless we structure it carefully
  presetMenuItems.forEach(item => {
    item.selected = (currentMode === item.anime4kMode);
  });
  
  fastQualityMenu.selected = (currentQuality === "fast");
  hqQualityMenu.selected = (currentQuality === "hq");
  offMenu.selected = (currentMode === "off");
  autoApplyMenu.selected = autoApply;
}

const presetMenus = modes.map((m, i) => {
  const bindings = ["1", "2", "3", "4", "5", "6"];
  const item = menu.item(`${m.name} (${m.desc})`, () => {
    applyShader(m.id, currentQuality);
  }, { keyBinding: bindings[i] });
  item.anime4kMode = m.id;
  presetMenuItems.push(item);
  return item;
});

const offMenu = menu.item("Disable Anime4K (Off)", () => applyShader("off"), { keyBinding: "0" });
offMenu.anime4kMode = "off";
presetMenuItems.push(offMenu);

const qualityMenu = menu.item("Quality Tier");
const fastQualityMenu = menu.item("Fast (M1/M2/Intel)", () => {
  setQuality("fast");
}, { keyBinding: "7" });
const hqQualityMenu = menu.item("HQ (M1 Pro/Max/Ultra)", () => {
  setQuality("hq");
}, { keyBinding: "8" });

qualityMenu.addSubMenuItem(fastQualityMenu);
qualityMenu.addSubMenuItem(hqQualityMenu);

const autoApplyMenu = menu.item("Auto-Apply on Video Load", () => {
  setAutoApply(!autoApply);
});

const presetSubMenu = menu.item("Presets");
presetSubMenu.addSubMenuItem(offMenu);
presetSubMenu.addSubMenuItem(menu.separator());
presetMenus.forEach(m => presetSubMenu.addSubMenuItem(m));

menu.addItem(presetSubMenu);
menu.addItem(qualityMenu);
menu.addItem(autoApplyMenu);

updateMenu();

// 4. Sidebar System
let sidebarLoaded = false;
let hasLoggedSidebarReady = false;

function logSidebarReady(protocol) {
  if (hasLoggedSidebarReady) return;
  hasLoggedSidebarReady = true;
  console.log(`Anime4K sidebar: received ${protocol} ready`);
}

function registerSidebarMessageHandlers() {
  sidebar.onMessage(sidebarMessages.ready, () => {
    logSidebarReady("modern");
    sendSidebarState();
  });

  sidebar.onMessage(sidebarMessages.applyMode, (data) => {
    console.log(`Anime4K sidebar: received applyMode ${data && data.mode}`);
    applyShader(data.mode, currentQuality);
  });

  sidebar.onMessage(sidebarMessages.setQuality, (data) => {
    console.log(`Anime4K sidebar: received setQuality ${data && data.quality}`);
    setQuality(data.quality);
  });

  sidebar.onMessage(sidebarMessages.setAutoApply, (data) => {
    console.log(`Anime4K sidebar: received setAutoApply ${data && data.autoApply}`);
    setAutoApply(data.autoApply);
  });

  sidebar.onMessage(legacySidebarMessages.ready, () => {
    logSidebarReady("legacy");
    sendSidebarState();
  });

  sidebar.onMessage(legacySidebarMessages.apply, (data) => {
    if (!data) return;
    console.log(`Anime4K sidebar: received legacy apply ${JSON.stringify(data)}`);

    if (data.mode === currentMode && data.quality && data.quality !== currentQuality) {
      setQuality(data.quality);
      return;
    }

    applyShader(data.mode, data.quality || currentQuality);
  });

  sidebar.onMessage(legacySidebarMessages.toggleAutoApply, (data) => {
    if (!data) return;
    console.log(`Anime4K sidebar: received legacy toggleAutoApply ${data.autoApply}`);
    setAutoApply(data.autoApply);
  });
}

function loadSidebar() {
  if (sidebarLoaded) return;
  sidebarLoaded = true;
  sidebar.loadFile("dist/ui/sidebar/sidebar.html");
  registerSidebarMessageHandlers();
}

if (core.window.loaded) {
  loadSidebar();
}

event.on("iina.window-loaded", loadSidebar);

// 5. Auto Apply
event.on("iina.file-loaded", () => {
  if (autoApply && currentMode !== "off") {
    // Re-apply the shader for the new file
    applyShader(currentMode, currentQuality);
  } else if (!autoApply && currentMode !== "off") {
    mpv.command("change-list", ["glsl-shaders", "clr", ""]);
    currentMode = "off";
    saveState();
    updateMenu();
    sendSidebarState();
  }
});

console.log("Anime4K Plugin initialized.");
