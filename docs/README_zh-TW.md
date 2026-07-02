<div align="center">

# 🌸 Anime4K for IINA

**macOS IINA 播放器即時動漫畫質提升與超解析度外掛程式**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Apple Silicon](https://img.shields.io/badge/Apple%20Silicon-M1%20%7C%20M2%20%7C%20M3-0071E3?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/mac/)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-anime4k/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)

[**English**](../README.md) • [**简体中文**](README_zh-CN.md) • [**繁體中文**](README_zh-TW.md) • [**日本語**](README_ja.md) • [**Русский**](README_ru.md)

</div>

---

**Anime4K for IINA** 是一款專為 macOS [IINA](https://iina.io/) 播放器打造的現代化外掛程式，將著名的 [Anime4K](https://github.com/bloc97/Anime4K) 即時超解析度 GLSL 著色器無縫嵌入 IINA。外掛程式在首次啟動時會自動將其內建著色器寫入 IINA 外掛程式資料夾，並在播放期間透過 mpv 的 `glsl-shaders` 列表進行動態無感切換。您不再需要手動修改 `mpv.conf` 設定檔或繁瑣地維護著色器路徑！

## ✨ 功能亮點

* 🚀 **無縫貼合 IINA 原生體驗**：透過專屬 Anime4K 側邊欄、macOS 頂部選單列與 IINA 原生 OSD 提示完成全部控制，操作順暢不打斷觀影流程。
* 🌐 **54 國語言全量母語支援**：完整對齊 IINA 官方支援的全量 54 個語系，提供母語級 UI 翻譯與智慧作業系統語系偵測。
* ⚖️ **雙通道畫質階梯**：
  * **Fast**：輕量高效，針對 Apple Silicon (M1/M2) 與 Intel 機型深度優化。
  * **HQ**：啟用進階多通道複合著色器，適合搭載強勁 GPU (M1 Pro/Max/Ultra 及以上) 的設備。
* 🎛️ **六組核心預設鏈路**：支援 **Mode A、B、C、A+A、B+B、C+A** 六大模式，播放過程中隨時即時切換。
* 🔄 **智慧自動套用**：開啟後，載入新影片時會自動恢復您前次選定的畫質檔位與著色器模式。
* ⌨️ **極速快捷鍵**：支援選單快捷鍵（`1`–`6` 切換模式，`0` 關閉，`7` 切換 Fast 檔，`8` 切換 HQ 檔）。

## 📖 預設模式指南

| 預設 | 建議起點與適用場景 |
| :---: | :--- |
| **Mode A** | 絕大多數 **1080p 動畫**，以及存在常規畫質模糊、輕微退化的片源 |
| **Mode B** | **720p 動畫**，或使用 Mode A 時畫面銳化痕跡過強、不夠自然的片源 |
| **Mode C** | **480p / SD 老番**、雜訊明顯，或需要先期降噪與重塑的內容 |
| **Mode A+A** | 雙通道進階 Mode A 鏈路；畫質極佳，運算消耗較大，銳化效果更加激進 |
| **Mode B+B** | 雙通道進階 Mode B 鏈路；畫質極佳，運算消耗較大，銳化效果更加激进 |
| **Mode C+A** | Mode C 降噪結合額外紋理重建；專門應對難度極高的低解析度老片源 |

> [!TIP]
> 絕大多數動畫推薦先從 **Fast + Mode A** 開始體驗。如果您的 Mac GPU 效能充裕，推薦嘗試 **HQ** 或雙通道複合模式（`A+A`、`B+B`、`C+A`）；如果發現畫面出現過度銳化、雜訊放大或振鈴白邊，請切換至較溫和的 Mode B 或 Mode C。

## 🚀 安裝與使用

1. 前往 [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) 頁面下載最新版本的 `anime4k.iinaplgz` 外掛程式包。
2. 雙擊下載的 `.iinaplgz` 檔案自動安裝到 IINA 中，或者打開 IINA 進入 `偏好設定 -> 外掛程式` 進行手動安裝。
3. 打開任意動畫影片，呼出 IINA 側邊欄，切換到 **Anime4K** 標籤頁，盡情選擇您喜愛的畫質檔位與預設模式！

## 🛠️ 從原始碼建構

### 環境需求
* 已安裝 [IINA](https://iina.io/) 的 **macOS** 系統
* **Node.js** 與 **npm**
* **Python 3**
* **Git**（需支援 submodule 子模組，用於拉取上游 Anime4K 著色器）

### 建構指令
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
執行完畢後，專案根目錄下即可生成打包好的最新外掛程式包 `anime4k.iinaplgz`。

## 👨‍💻 開發架構說明

* `src/index.js` — 外掛程式核心執行時（著色器自動配置、狀態持久化、選單同步、OSD 訊息與自動載入邏輯）。
* `src/shaders.js` — Fast 與 HQ 兩檔著色器鏈路與參數對映。
* `src/i18n.js` — 全量 54 種語言在地化字典與系統語系偵測引擎。
* `ui/sidebar/` — 側邊欄 Web UI 的前端互動與樣式定義。
* `build-shaders.py` — 預編譯腳本，讀取並解析 `Anime4K/glsl/**/*.glsl`，捆綁生成 `src/shaders-data.js`。

## 🤝 社群與友情連結

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
