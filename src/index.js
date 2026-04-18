import { shadersData } from "./shaders-data";
import { presets, modes } from "./shaders";

const { core, event, menu, mpv, console, file, utils, preferences, sidebar, overlay } = iina;

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

function applyShader(mode, quality) {
  if (mode === "off") {
    mpv.command("change-list", ["glsl-shaders", "clr", ""]);
    showOSD("Anime4K: Off");
    currentMode = "off";
    saveState();
    updateMenu();
    updateSidebar();
    return;
  }

  const shaderList = presets[quality][mode];
  if (!shaderList) {
    console.error(`Invalid mode/quality: ${mode} / ${quality}`);
    return;
  }

  const paths = shaderList.map(s => utils.resolvePath(`@data/${s}`)).join(":");
  mpv.command("change-list", ["glsl-shaders", "set", paths]);
  
  const qualityText = quality === "hq" ? "HQ" : "Fast";
  showOSD(`Anime4K: Mode ${mode} (${qualityText})`);
  
  currentMode = mode;
  currentQuality = quality;
  saveState();
  updateMenu();
  updateSidebar();
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
  if (currentMode !== "off") applyShader(currentMode, "fast");
  else { currentQuality = "fast"; saveState(); updateMenu(); updateSidebar(); }
}, { keyBinding: "7" });
const hqQualityMenu = menu.item("HQ (M1 Pro/Max/Ultra)", () => {
  if (currentMode !== "off") applyShader(currentMode, "hq");
  else { currentQuality = "hq"; saveState(); updateMenu(); updateSidebar(); }
}, { keyBinding: "8" });

qualityMenu.addSubMenuItem(fastQualityMenu);
qualityMenu.addSubMenuItem(hqQualityMenu);

const autoApplyMenu = menu.item("Auto-Apply on Video Load", () => {
  autoApply = !autoApply;
  saveState();
  updateMenu();
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
event.on("iina.window-loaded", () => {
  sidebar.loadFile("dist/ui/sidebar/sidebar.html");
});

function updateSidebar() {
  sidebar.postMessage("state", {
    mode: currentMode,
    quality: currentQuality,
    autoApply: autoApply
  });
}

sidebar.onMessage("apply", (data) => {
  applyShader(data.mode, data.quality);
});

sidebar.onMessage("toggleAutoApply", (data) => {
  autoApply = data.autoApply;
  saveState();
  updateMenu();
});

// Sync sidebar when it's ready
sidebar.onMessage("ready", () => {
  updateSidebar();
});

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
    updateSidebar();
  }
});

console.log("Anime4K Plugin initialized.");