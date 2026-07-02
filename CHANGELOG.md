# Changelog

All notable changes to this project will be documented in this file.

## [1.2.1] - 2026-07-02

### Bug Fixes & Improvements
- **Native Preference Persistence Fix**: Solved an IINA native limitation where `<select>` dropdown elements were not bound by IINA's `data-pref-key` WKWebView bridge. Implemented a hidden input proxy architecture (`<input type="text" data-pref-key="lang">`) with two-way event synchronization (`input` & `change` events) to guarantee reliable preference persistence.
- **Real-Time Background Sync**: Added `preferences.sync()` to the main plugin loop. Changing language preferences in the settings window now applies instantly to the OSD and sidebar without requiring an IINA restart.
- **CI/CD Automation**: Upgraded GitHub Actions workflow (`build.yml`) to automatically build and attach `anime4k.iinaplgz` to GitHub Releases whenever version tags are pushed.

## [1.2.0] - 2026-07-02

### New Features & Changes
- **100% Global Localization Coverage**: Upgraded the static preferences page (`pref.html`) to support all 54 official IINA languages.
- **Smart System Locale Detection**: The "System Default" option in language selection now dynamically detects and displays the user's actual macOS system locale name (e.g., `Auto (System Default: English)`).
- **Streamlined UI**: Removed redundant Quality Tier settings from the preferences window, keeping global configuration clean and focused on language and auto-apply behavior.

## [1.1.0] - 2026-07-02

### New Features & Changes
- **Native Preferences Page**: Added native macOS static preferences page (`pref.html`) directly in the plugin root.
- **Build Automation**: Created `generate-pref.py` to automatically compile localization data into standard static HTML during `npm run pack`.

## [1.0.0] - 2026-04-18

### Initial Release
- Bundled Anime4K GLSL shaders into IINA with real-time sidebar and menu bar switching.
- Supported Fast (M1/M2/Intel) and HQ (M1 Pro/Max/Ultra) performance tiers.
- Supported Modes A, B, C, A+A, B+B, and C+A with smart auto-apply on video load.
