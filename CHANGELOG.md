# Changelog

All notable changes to this project will be documented in this file.

## [1.2.3] - 2026-07-04

### New Features & Changes
- **Online Repository & Auto-Update Integration**: Added `ghRepo` (`yorkyang2333/iina-anime4k`) and `ghVersion` (`6`) metadata to `Info.json`, enabling IINA's built-in GitHub automatic update checker and linking the "Source" repository in the plugin UI.
- **Author Website Linking**: Configured `author.url` in `Info.json` and updated `package.json` repository/homepage fields so that IINA displays the "Website" link directly in the plugin management UI.
- **Developer Documentation & Architecture Guidelines**: Added a comprehensive `CONTRIBUTING.md` developer guide and `.agents/AGENTS.md` rules covering local build scripts, versioning conventions, and IINA CI/CD release automation.

## [1.2.2] - 2026-07-04

### Bug Fixes & Improvements
- **100% System Default Localization**: Expanded `sys_word_map` in the preferences page generator (`generate-pref.py`) to include native translations for the "System Default" phrase across all 54 supported IINA locales.
- **Codebase Cleanup**: Removed obsolete node build script `build-shaders.js` (superseded by `build-shaders.py`) and unused plugin template boilerplate directory `ui/window/`.

## [1.2.1] - 2026-07-02

### Bug Fixes & Improvements
- **Native Preference Persistence Fix**: Solved an IINA native limitation where `<select>` dropdown elements were not bound by IINA's `data-pref-key` WKWebView bridge. Implemented a hidden input proxy architecture (`<input type="text" data-pref-key="lang">`) with two-way event synchronization (`input` & `change` events) to guarantee reliable preference persistence.
- **Real-Time Background Sync**: Added `preferences.sync()` to the main plugin loop. Changing language preferences in the settings window now applies instantly to the OSD and sidebar without requiring an IINA restart.
- **CI/CD Release Automation**: Upgraded the GitHub Actions workflow (`build.yml`) to automatically build and attach `anime4k.iinaplgz` to GitHub Releases whenever version tags (`v*`) are pushed.

## [1.2.0] - 2026-07-02

### New Features & Changes
- **100% Global Localization Coverage**: Upgraded the static preferences page (`pref.html`) to support all 54 official IINA languages, aligning completely with IINA's official internationalization roster.
- **Smart System Locale Detection**: The "System Default" option in the language selection dropdown now dynamically detects and displays the user's actual macOS system locale name (e.g., `Auto (System Default: English)`).
- **Streamlined Configuration UI**: Removed redundant Quality Tier settings from the preferences window, keeping global configuration clean and focused on language and auto-apply behavior.

## [1.1.0] - 2026-07-02

### New Features & Changes
- **Native Preferences Page**: Added a native macOS static preferences page (`pref.html`) directly in the plugin root, allowing seamless UI language customization and auto-apply configuration.
- **Build Automation**: Created `generate-pref.py` to automatically compile localization data into standard static HTML during `npm run pack`.

## [1.0.0] - 2026-04-18

### Initial Release
- **Packaged IINA Plugin**: Created the self-contained `anime4k.iinaplgz` plugin package for macOS IINA.
- **Automated Shader Management**: Bundles official Anime4K GLSL shaders and installs them automatically into the plugin data directory without manual `mpv.conf` editing.
- **Quality Tiers**: Support for two performance tiers: **Fast** (optimized for standard Apple Silicon & Intel Macs) and **HQ** (multi-pass variants for M-series Pro/Max/Ultra chips).
- **Preset Chains & Menu Controls**: Supports Mode A, B, C, A+A, B+B, and C+A with quick keyboard shortcuts (`1`–`8`), native menu bar integration, OSD feedback, and smart auto-apply on video load.
