# Contributing to IINA Anime4K Plugin

Thank you for your interest in contributing to the `iina-anime4k` plugin! This document provides guidelines and instructions for developers and contributors to help build, test, and release the plugin.

---

## 1. Prerequisites & Development Setup

To build and test the plugin locally, ensure you have the following installed on macOS:
- **[IINA](https://iina.io/)**: macOS media player (latest stable version).
- **[Node.js](https://nodejs.org/)**: v18+ and `npm`.
- **Python 3**: For shader pre-compilation and locale preference generation.

### Initial Setup
Clone the repository and install the Node dependencies:
```bash
git clone --recursive https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
npm ci
```

---

## 2. Building & Testing Locally

The plugin uses Parcel to bundle modern JavaScript and CSS, Python scripts to generate multilingual preference UI (`pref.html`), and pre-compile GLSL shaders into static data (`src/shaders-data.js`).

### Available NPM Scripts
- `npm run build`: Compiles shaders (`build-shaders.py`), generates localization HTML (`generate-pref.py`), and bundles JavaScript/CSS into the `dist/` directory.
- `npm run serve-sidebar`: Launches a local development server for live-reloading UI components during sidebar development.
- `npm run pack`: Executes a full build and packages the artifact into `anime4k.iinaplugin` and `anime4k.iinaplgz` archives for release distribution.

### How to Test in IINA
1. Run `npm run build` or `npm run pack` locally.
2. Open IINA, go to **Settings (偏好设置) -> Plugins (插件)**.
3. Click **Install from local file... (安装本地插件)** and select the project directory or the generated `anime4k.iinaplugin` package.
4. Enable the plugin and play a video to verify sidebar controls and OSD feedback.

---

## 3. Core Architecture & File Organization

- `src/index.js`: The main plugin runtime engine. Handles communication with IINA/mpv (`glsl-shaders`), menu bar synchronization, state persistence, and auto-apply rules.
- `src/shaders.js`: Defines quality tiers (**Fast** vs **HQ**) and preset shader chains (**Mode A, B, C**, etc.).
- `src/i18n.js`: Native 54-language localization dictionary and system locale matching engine.
- `ui/sidebar/`: HTML/CSS/JS components displayed in IINA's sidebar tab.
- `build-shaders.py`: Scans `Anime4K/glsl/` and generates `src/shaders-data.js`.
- `generate-pref.py`: Generates the static multilingual preferences interface (`pref.html`).

---

## 4. Versioning Conventions & Auto-Update (`ghVersion`)

IINA uses specific metadata in `Info.json` to link repositories, author websites, and trigger online updates.

### Two Distinct Version Fields
1. **Semantic Version (`version`)**: The human-readable string defined in both `package.json` and `Info.json` (e.g., `"1.2.3"`).
2. **Online Auto-Update Counter (`ghVersion`)**: A mandatory **integer** defined in `Info.json` representing the cumulative release count on GitHub. When checking for updates, IINA compares `ghVersion_remote > ghVersion_local`.

### Critical Increment Rule for Pull Requests & Releases
- Whenever releasing a new version, **you must increment `ghVersion` by exactly 1** (`new_ghVersion = current_ghVersion + 1`).
- Never hardcode or reset `ghVersion` to match semantic strings (e.g., do not use string values or format like `123`).
- Historical Baseline: Release `v1.2.2` corresponded to `"ghVersion": 5`, and `v1.2.3` corresponds to `"ghVersion": 6`.

---

## 5. Why Build Artifacts Are Not Committed to Git

When browsing the Git repository, you will notice that compiled directories and generated files (`dist/`, `pref.html`, `src/shaders-data.js`, `*.iinaplgz`) are listed in `.gitignore` and not tracked in version control.

### Why?
When end users update or install plugins from GitHub via IINA, IINA queries the GitHub API (`api.github.com/repos/yorkyang2333/iina-anime4k/releases/latest`) and **directly downloads the pre-compiled `.iinaplgz` binary asset attached to the GitHub Release**.

Because our CI/CD GitHub Actions workflow (`.github/workflows/build.yml`) automatically compiles and uploads `anime4k.iinaplgz` on tag pushes, tracking minified build artifacts in Git is unnecessary. This keeps the Git history clean and lightweight for developers.

---

## 6. Submitting Pull Requests & Cutting Releases

### Pull Request Guidelines
1. Ensure your code follows existing styling conventions and passes `npm run build`.
2. Do not include build output files (`dist/`, etc.) in your commit.
3. Write clear, descriptive commit messages.

### Release Checklist (For Maintainers)
1. Update `version` in `package.json` and `Info.json`.
2. Increment `ghVersion` integer in `Info.json` by `1`.
3. Add a new release section at the top of `CHANGELOG.md`.
4. Commit changes: `git commit -m "chore(release): vX.Y.Z"`.
5. Create tag: `git tag vX.Y.Z`.
6. Push commit and tag: `git push origin main && git push origin vX.Y.Z`.
7. GitHub Actions will automatically build and publish the release asset for IINA users!
