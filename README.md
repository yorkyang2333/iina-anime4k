# Anime4K for IINA

[简体中文](README_zh-CN.md)

**Anime4K for IINA** is a macOS IINA plugin that packages the [Anime4K](https://github.com/bloc97/Anime4K) GLSL shaders and applies them directly through IINA. It installs the bundled shaders into the plugin data directory on first launch, then switches mpv's `glsl-shaders` list dynamically, so you do not need to maintain `mpv.conf` entries or shader paths by hand.

## Features

- **Native IINA workflow**: use the Anime4K sidebar tab, plugin menu items, and IINA OSD feedback without leaving playback.
- **Two quality tiers**: choose **Fast** for lower overhead or **HQ** for stronger hardware and higher quality shader variants.
- **Six preset chains**: switch between Mode A, B, C, A+A, B+B, and C+A during playback.
- **Auto-apply support**: keep the selected mode active when a new video loads, or turn auto-apply off from the sidebar or menu.
- **Menu key bindings**: use `1`-`6` for preset modes, `0` to disable Anime4K, `7` for Fast, and `8` for HQ.
- **Self-contained packaging**: `npm run pack` builds the sidebar UI, embeds Anime4K shader files, and produces `anime4k.iinaplgz`.

## Preset Guide

| Preset | Best starting point |
| --- | --- |
| Mode A | Most 1080p anime and generally degraded sources |
| Mode B | 720p anime or sources where Mode A looks too strong |
| Mode C | 480p anime, noisier sources, or sources that need denoise-first processing |
| Mode A+A | Higher quality Mode A chain; slower and more aggressive |
| Mode B+B | Higher quality Mode B chain; slower and more aggressive |
| Mode C+A | Mode C with extra reconstruction; useful for difficult low-resolution sources |

Start with **Fast + Mode A** for most videos. If the GPU has enough headroom, try **HQ** or one of the double-pass modes. If the image becomes over-sharpened, noisy, or ringed, step back to a lighter mode.

## Installation

1. Download `anime4k.iinaplgz` from the [Releases](https://github.com/yorkyang2333/iina-anime4k/releases) page, or build it locally with the steps below.
2. Double-click the package to install it in IINA, or open IINA and install it from `Settings -> Plugins`.
3. Open a video, show IINA's sidebar, switch to the **Anime4K** tab, then choose a quality tier and preset.

## Build From Source

Requirements:

- macOS with IINA installed
- Node.js and npm
- Python 3
- Git submodules, because the upstream Anime4K shaders live in `Anime4K/`

```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```

The packaged plugin will be written to `anime4k.iinaplgz` in the repository root.

## Development Notes

- `src/index.js` contains the IINA plugin runtime: shader installation, state persistence, menu items, sidebar messages, OSD, and auto-apply behavior.
- `src/shaders.js` defines the Fast/HQ preset chains.
- `ui/sidebar/` contains the sidebar web UI.
- `build-shaders.py` reads `Anime4K/glsl/**/*.glsl` and generates `src/shaders-data.js`.
- `dist/`, `src/shaders-data.js`, `anime4k.iinaplugin/`, and `anime4k.iinaplgz` are generated build outputs and are intentionally ignored by Git.
