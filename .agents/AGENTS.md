# IINA Anime4K Plugin Project Rules & Development Guidelines

This document outlines the core conventions, versioning rules, release workflow, and architectural best practices for the `iina-anime4k` plugin repository. All AI assistants, developers, and contributors MUST adhere to these guidelines without exception.

---

## 1. Versioning & Auto-Update Rules (`ghVersion`)

IINA relies on specific metadata in `Info.json` to identify online repositories, link to author websites, and trigger automatic updates for users.

### Two Distinct Versioning Fields:
1. **Semantic Version (`version`)**: The human-readable string defined in both `package.json` and `Info.json` (adhering to Semantic Versioning `MAJOR.MINOR.PATCH`, such as `"1.2.2"`).
2. **Online Auto-Update Counter (`ghVersion`)**: A mandatory **integer** defined in `Info.json` representing the cumulative release iteration count on GitHub. IINA's built-in update checker compares integer values (`ghVersion_remote > ghVersion_local`) to prompt users for upgrades.

### CRITICAL Increment Rule:
- **Never hardcode or reset `ghVersion`**. When preparing any new release (patch, minor, or major), you MUST check the existing `ghVersion` integer in `Info.json` and **increment it by exactly 1** (`new_ghVersion = current_ghVersion + 1`).
- **Baseline Reference**: As a historical baseline reference, release `v1.2.2` corresponded to `"ghVersion": 5`. Any subsequent release must dynamically increment from whatever the current existing number is (e.g., `5 -> 6`, `6 -> 7`, etc.).
- **Do NOT** change `ghVersion` to a string or attempt to match it to the semantic version string.
- **Author & Repository Metadata**: Always ensure `Info.json` contains valid `ghRepo` (`"yorkyang2333/iina-anime4k"`) and `author.url` (`"https://github.com/yorkyang2333/iina-anime4k"`) so IINA displays both the Source and Website links in its UI.

---

## 2. Complete Release & Build Workflow

When instructed to prepare or cut a new release, follow this comprehensive, step-by-step checklist without skipping any step:

### Step 1: Update Metadata & Changelog
1. **Bump Version Numbers**: Update the `version` string in both `package.json` and `Info.json` to the target semantic version (e.g., `"1.2.3"`).
2. **Increment `ghVersion`**: Read the current `ghVersion` integer in `Info.json` and increment it by `1` (e.g., `5 -> 6`).
3. **Update Changelog**: Add a new release entry at the top of `CHANGELOG.md` following the Keep a Changelog format:
   - Header: `## [X.Y.Z] - YYYY-MM-DD`
   - Use structured subsections: `### New Features & Changes` and/or `### Bug Fixes & Improvements`.
   - Provide clear, professional descriptions of all modifications.

### Step 2: Build & Pack Artifacts
1. Execute the official packaging command:
   ```bash
   npm run pack
   ```
2. **What the build script does**:
   - `build-shaders.py`: Scans `Anime4K/glsl/**/*.glsl` and compiles shaders into `src/shaders-data.js`.
   - `generate-pref.py`: Generates the static `pref.html` interface supporting all 54 official IINA locales.
   - `parcel build`: Bundles and optimizes JavaScript/CSS into the `dist/` directory (`dist/index.js`, `dist/global.js`, `dist/ui/`).
   - Packaging: Copies artifacts into `anime4k.iinaplugin/` and creates the standalone `anime4k.iinaplgz` distribution archive.
3. **CRITICAL - Do NOT Commit Build Artifacts (`dist/`, `src/shaders-data.js`, `*.iinaplgz`) to Git**:
   - **How IINA Auto-Update Actually Works (`JavascriptPlugin.swift`)**: When installing or updating a plugin from a GitHub repository (`ghRepo`), IINA queries `https://api.github.com/repos/{ghRepo}/releases/latest`. If a release asset ending with `.iinaplgz` is found, **IINA downloads and installs the `.iinaplgz` package directly from GitHub Releases** (it only downloads source code archives as a fallback if no release asset exists).
   - **Why this keeps Git clean**: Because our CI/CD workflow (`.github/workflows/build.yml`) automatically compiles the plugin and uploads `anime4k.iinaplgz` to GitHub Releases on tag pushes, end users updating via IINA always download the compiled release package. Therefore, **never commit `dist/`, `src/shaders-data.js`, `anime4k.iinaplugin/`, or `anime4k.iinaplgz` to Git**; keep them in `.gitignore` to maintain a pristine source-only repository.

### Step 3: Git Commit & Tagging
1. Stage all modified source files and metadata manifests (`src/`, `ui/`, `Info.json`, `package.json`, `package-lock.json`, `CHANGELOG.md`, `pref.html`):
   ```bash
   git add src/ ui/ Info.json package.json package-lock.json CHANGELOG.md pref.html
   ```
2. Create a clean release commit with standard conventional commit wording:
   ```bash
   git commit -m "chore(release): vX.Y.Z"
   ```
3. Create a Git tag matching the exact release version prefixed with `v`:
   ```bash
   git tag vX.Y.Z
   ```

### Step 4: CI/CD & GitHub Release Automation
1. Push both the release commit and the tag to the remote repository:
   ```bash
   git push origin main
   git push origin vX.Y.Z
   ```
2. **Automated CI/CD Behavior**: Pushing a tag matching `v*` automatically triggers the GitHub Actions workflow (`.github/workflows/build.yml`). The CI runner checks out submodules recursively, executes `npm ci` and `npm run pack`, creates the official GitHub Release with release notes, and uploads the compiled binary asset `anime4k.iinaplgz` for end users.
3. **Mandatory GitHub Release Notes Formatting**: After pushing the tag or when editing the release notes via GitHub CLI (`gh release edit vX.Y.Z --notes-file <file>`), the release notes MUST be written in clean, user-facing, professional Markdown without exposing internal development chatter or gitignore debugging. Always format release notes using the following structured template:
   ```markdown
   ## 🌸 What's New in vX.Y.Z

   ### ✨ New Features & Improvements
   * **Feature Name**: Professional, user-centric description of the new feature or enhancement.
   * **Another Feature**: Description of changes.

   ### 🐛 Bug Fixes & Optimizations
   * **Fix Name**: Professional explanation of the bug fix or stability improvement.

   ---
   **Full Changelog**: https://github.com/yorkyang2333/iina-anime4k/compare/vPREV...vX.Y.Z
   ```

---

## 3. Core Architecture & File Mapping

When navigating or modifying the codebase, respect the responsibilities of each module:
- `src/index.js`: The core plugin runtime. Handles shader loading into mpv's `glsl-shaders` property, state persistence, menu bar synchronization, OSD messaging, and video auto-apply logic.
- `src/shaders.js`: Defines quality tiers (**Fast** vs **HQ**) and maps preset chains (**Mode A, B, C, A+A, B+B, C+A**).
- `src/i18n.js`: Contains the native 54-language translation dictionary and system locale detection engine.
- `ui/sidebar/`: Contains the web UI HTML/CSS/JS components displayed in IINA's sidebar tab.
- `build-shaders.py`: Python pre-compiler for GLSL shader aggregation. Ensure Git submodules are initialized (`git submodule update --init --recursive`) when cloning.
- `generate-pref.py`: Python generator for the multilingual preferences page (`pref.html`).

---

## 4. Architectural & UI Best Practices (CRITICAL)

### 1. IINA WKWebView `<select>` Preference Bridge Limitation
- **The Constraint**: In IINA's native preferences UI (`pref.html`), HTML `<select>` dropdown elements are **not** natively monitored or persisted by IINA's `data-pref-key` WKWebView bridge.
- **The Required Pattern**: To persist dropdown selections (e.g., language selection), you MUST maintain a hidden text input proxy architecture:
  ```html
  <select id="lang-select">...</select>
  <input type="text" data-pref-key="lang" id="lang-proxy" style="display: none;" />
  ```
- **Event Synchronization**: You must bind bidirectional JavaScript listeners (`change` on `<select>` updating `<input>`, and `input` on `<input>` updating `<select>`) to guarantee reliable preference persistence across restarts. **Never revert to putting `data-pref-key` directly on a `<select>` element.**

### 2. Real-Time Background Synchronization
- Always ensure `preferences.sync()` is executed in the runtime loop when handling configuration updates, so user changes made in the preferences window immediately reflect in the sidebar and OSD without requiring an IINA restart.

### 3. Localization Consistency (`sys_word_map`)
- Whenever adding or updating localization strings in `generate-pref.py`, ensure the `sys_word_map` dictionary maintains 100% coverage across all 54 supported IINA locales (especially for dynamic terms like `"System Default"`).
