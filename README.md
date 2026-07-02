<div align="center">

# 🌸 Anime4K for IINA

**High-Quality Real-Time Anime Upscaling Plugin for macOS IINA**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![License](https://img.shields.io/github/license/yorkyang2333/iina-anime4k?style=for-the-badge&color=ffdd57)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)
[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)

[**English**](README.md) • [**简体中文**](README_zh-CN.md)

</div>

---

**Anime4K for IINA** is a modern macOS plugin that packages the acclaimed [Anime4K](https://github.com/bloc97/Anime4K) real-time GLSL shaders and embeds them seamlessly into [IINA](https://iina.io/). It installs the bundled shaders into the plugin data directory on first launch, dynamically managing mpv's `glsl-shaders` list on the fly—no manual `mpv.conf` configuration or script editing required!

## ✨ Features

* 🚀 **Native IINA Workflow**: Control everything via the dedicated Anime4K sidebar tab, macOS top menu bar, and native IINA OSD feedback without leaving playback.
* 🌐 **Global 54-Language Support**: Fully aligned with official IINA's internationalization roster, featuring native UI translations and dynamic system locale detection.
* ⚖️ **Two Quality Tiers**:
  * **Fast**: Lightweight & efficient, optimized for Apple Silicon (M1/M2) and Intel Macs.
  * **HQ**: Advanced multi-pass shader variants for high-end GPUs (M1 Pro/Max/Ultra and above).
* 🎛️ **Six Preset Chains**: Switch between **Mode A, B, C, A+A, B+B, and C+A** instantly during video playback.
* 🔄 **Smart Auto-Apply**: Automatically restores your preferred scaling mode and quality tier whenever a new video loads.
* ⌨️ **Menu Keybindings**: Quick keyboard shortcuts (`1`–`6` for presets, `0` to disable, `7` for Fast tier, and `8` for HQ tier).

## 📖 Preset Guide

| Preset | Best Starting Point & Recommended Usage |
| :---: | :--- |
| **Mode A** | Most **1080p anime** and generally degraded or blurry sources |
| **Mode B** | **720p anime** or sources where Mode A appears too sharp or unnatural |
| **Mode C** | **480p / SD anime**, noisy sources, or videos requiring denoise-first processing |
| **Mode A+A** | Double-pass Mode A chain; higher quality, slower, and more aggressive sharpening |
| **Mode B+B** | Double-pass Mode B chain; higher quality, slower, and more aggressive sharpening |
| **Mode C+A** | Mode C combined with extra reconstruction; ideal for difficult low-resolution video |

> [!TIP]
> Start with **Fast + Mode A** for most anime videos. If your Mac has extra GPU headroom, switch to **HQ** or one of the double-pass modes (`A+A`, `B+B`, `C+A`). If the image appears over-sharpened, noisy, or introduces ringing artifacts, step back to Mode B or Mode C.

## 🚀 Installation

1. Go to the [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) page and download the latest `anime4k.iinaplgz` package.
2. Double-click the downloaded file to install it directly into IINA, or open IINA and navigate to `Preferences -> Plugins` to install manually.
3. Open any anime video, show IINA's sidebar, switch to the **Anime4K** tab, and pick your quality tier and mode!

## 🛠️ Build From Source

### Requirements
* **macOS** with [IINA](https://iina.io/) installed
* **Node.js** & **npm**
* **Python 3**
* **Git** (with submodule support for upstream Anime4K shaders)

### Build Commands
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
Once the build finishes, the packaged plugin `anime4k.iinaplgz` will be generated in the project root directory.

## 👨‍💻 Development Notes

* `src/index.js` — The core plugin runtime (shader installation, state persistence, menu synchronization, OSD messaging, and auto-apply logic).
* `src/shaders.js` — Configuration and mapping for Fast and HQ shader chains.
* `src/i18n.js` — Full 54-language native localization dictionary and system locale detection engine.
* `ui/sidebar/` — Web UI components and styling for the IINA sidebar.
* `build-shaders.py` — Pre-compilation script that processes `Anime4K/glsl/**/*.glsl` and generates `src/shaders-data.js`.

## 🤝 Community & Links

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
