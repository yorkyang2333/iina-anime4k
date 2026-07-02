<div align="center">

# 🌸 Anime4K for IINA

**macOS IINA プレイヤー向け アニメリアルタイム高画質化＆超解像プラグイン**

[![Release](https://img.shields.io/github/v/release/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FF69B4)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![Downloads](https://img.shields.io/github/downloads/yorkyang2333/iina-anime4k/total?style=for-the-badge&logo=github&color=00d1b2)](https://github.com/yorkyang2333/iina-anime4k/releases)
[![IINA](https://img.shields.io/badge/IINA-%E2%89%A5%201.3.0-5865F2?style=for-the-badge&logo=apple&logoColor=white)](https://iina.io/)
[![macOS](https://img.shields.io/badge/macOS-11.0%2B-000000?style=for-the-badge&logo=apple&logoColor=white)](https://www.apple.com/macos/)
[![Stars](https://img.shields.io/github/stars/yorkyang2333/iina-anime4k?style=for-the-badge&logo=github&color=FFD700)](https://github.com/yorkyang2333/iina-anime4k/stargazers)
[![Powered by Anime4K](https://img.shields.io/badge/Powered%20by-Anime4K-FF4500?style=for-the-badge&logo=opengl&logoColor=white)](https://github.com/bloc97/Anime4K)
[![Languages](https://img.shields.io/badge/Languages-54%20Locales-32CD32?style=for-the-badge&logo=googletranslate&logoColor=white)](https://github.com/yorkyang2333/iina-anime4k/blob/main/src/i18n.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)](https://github.com/yorkyang2333/iina-anime4k/blob/main/LICENSE)

[**English**](../README.md) • [**简体中文**](README_zh-Hans.md) • [**繁體中文**](README_zh-Hant.md) • [**日本語**](README_ja.md) • [**Русский**](README_ru.md)

</div>

---

**Anime4K for IINA** は、macOS [IINA](https://iina.io/) プレイヤー向けに開発されたモダンなプラグインです。著名なオープンソースアニメ超解像アルゴリズム [Anime4K](https://github.com/bloc97/Anime4K) の GLSL シェーダーを IINA にシームレスに統合します。初回起動時に内蔵シェーダーを自動インストールし、動画再生中も mpv の `glsl-shaders` リストを動的に切り替えます。手動での `mpv.conf` の編集や面倒なパス管理は一切不要です！

## ✨ 主な機能・特徴

* 🚀 **IINA ネイティブな操作性**：専用の Anime4K サイドバー、macOS メニューバー、そして IINA 原生 OSD 通知を通じて、動画再生を中断することなく全てのコントロールが可能です。
* 🌐 **全 54 言語ネイティブ対応**：IINA 公式がサポートする全 54 言語と完全に同期。自然な母語翻訳とスマートなシステム言語検出機能を搭載しています。
* ⚖️ **2つの画質モード（クオリティティアー）**：
  * **Fast**：軽量かつ高速。Apple Silicon (M1/M2) や Intel Mac 向けに最適化されています。
  * **HQ**：マルチパス構成の高品質シェーダーを有効化。ハイエンド GPU (M1 Pro/Max/Ultra 以上) を搭載したマシンに最適です。
* 🎛️ **6つのプリセット構成**：**Mode A、B、C、A+A、B+B、C+A** を、動画再生中いつでもリアルタイムで切り替え可能です。
* 🔄 **スマート自動適用（Auto-Apply）**：新しい動画を読み込む際、前回選択した画質ティアーとシェーダーモードを自動的に復元します。
* ⌨️ **クイックショートカット**：キーボードキー一発で操作可能（`1`–`6` でモード切替、`0` でオフ、`7` で Fast ティアー、`8` で HQ ティアー）。

## 📖 プリセットガイド

| プリセット | おすすめの開始点と適した用途 |
| :---: | :--- |
| **Mode A** | 一般的な **1080p アニメ**、および多少のボケや画質劣化が見られる動画 |
| **Mode B** | **720p アニメ**、または Mode A だとシャープさが強すぎたり不自然に見える動画 |
| **Mode C** | **480p / SD 画質アニメ**、ノイズが多い動画、または事前のデノイズ処理が必要な動画 |
| **Mode A+A** | 2段階（ダブルパス）Mode A 構成。最高の画質を提供しますが、GPU 負荷が高くシャープネスも強力です |
| **Mode B+B** | 2段階（ダブルパス）Mode B 構成。最高の画質を提供しますが、GPU 負荷が高くシャープネスも強力です |
| **Mode C+A** | Mode C のデノイズと再構築を組み合わせた構成。処理が困難な低解像度動画に最適です |

> [!TIP]
> ほとんどのアニメ動画は、まず **Fast + Mode A** から試すことをお勧めします。Mac の GPU 性能に余裕がある場合は、**HQ** やダブルパスモード（`A+A`、`B+B`、`C+A`）にアップグレードしてみてください。シャープネスがかかりすぎたり、ノイズやリンギング（白い縁取り）が目立つ場合は、より穏やかな Mode B や Mode C に切り替えてください。

## 🚀 インストールと使い方

1. [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) ページから最新の `anime4k.iinaplgz` プラグインパッケージをダウンロードします。
2. ダウンロードした `.iinaplgz` ファイルをダブルクリックして IINA に直接インストールするか、IINA を開いて `環境設定 -> プラグイン` から手動でインストールします。
3. アニメ動画を開き、IINA のサイドバーを表示して **Anime4K** タブに切り替えたら、お好みの画質ティアーとモードを選択するだけです！

## 🛠️ ソースコードからのビルド

### 必要環境
* [IINA](https://iina.io/) がインストールされた **macOS**
* **Node.js** および **npm**
* **Python 3**
* **Git**（上流の Anime4K シェーダーを取得するため submodule サポートが必要）

### ビルド手順
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
ビルドが完了すると、リポジトリのルートディレクトリにパッケージ化されたプラグイン `anime4k.iinaplgz` が生成されます。

## 👨‍💻 開発に関するメモ

* `src/index.js` — プラグインのコアランタイム（シェーダー設置、状態永続化、メニュー同期、OSD メッセージ、自動適用ロジック）。
* `src/shaders.js` — Fast および HQ シェーダーチェーンの設定とパラメータマッピング。
* `src/i18n.js` — 全 54 言語のローカライズ辞書とシステム言語検出エンジン。
* `ui/sidebar/` — IINA サイドバー向け Web UI のコンポーネントとスタイリング。
* `build-shaders.py` — `Anime4K/glsl/**/*.glsl` を読み込み、`src/shaders-data.js` を生成するプレコンパイルスクリプト。

## 🤝 コミュニティ＆リンク

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
