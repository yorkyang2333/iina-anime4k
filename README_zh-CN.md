# Anime4K for IINA

[English](README.md)

**Anime4K for IINA** 是一款面向 macOS [IINA](https://iina.io/) 的插件，用来把 [Anime4K](https://github.com/bloc97/Anime4K) GLSL 着色器直接接入 IINA。插件首次启动时会把内置着色器写入插件数据目录，之后通过 IINA/mpv 的 `glsl-shaders` 列表动态切换效果，因此无需手动维护 `mpv.conf`，也不用自己处理着色器路径。

## 功能亮点

- **贴合 IINA 的使用方式**：通过 Anime4K 侧边栏、插件菜单和 IINA 原生 OSD 完成控制，不打断播放流程。
- **两档质量选项**：**Fast** 更轻量，适合优先保证流畅；**HQ** 使用更高质量的 shader 变体，更适合性能较强的设备。
- **六组预设链路**：支持 Mode A、B、C、A+A、B+B、C+A，可在播放中实时切换。
- **自动应用**：开启后，新视频载入时会继续应用上一次选择的模式；也可以在侧边栏或菜单中关闭。
- **菜单快捷键**：`1`-`6` 对应六组模式，`0` 关闭 Anime4K，`7` 切换 Fast，`8` 切换 HQ。
- **一键打包**：`npm run pack` 会构建侧边栏界面、嵌入 Anime4K 着色器，并生成 `anime4k.iinaplgz`。

## 预设选择

| 预设 | 建议起点 |
| --- | --- |
| Mode A | 大多数 1080p 动画，以及存在压缩、线条退化的片源 |
| Mode B | 720p 动画，或 Mode A 看起来过强的片源 |
| Mode C | 480p 动画、噪点较多的片源，或更需要先降噪的内容 |
| Mode A+A | 更高质量的 Mode A 链路，速度更慢，效果也更激进 |
| Mode B+B | 更高质量的 Mode B 链路，速度更慢，效果也更激进 |
| Mode C+A | 在 Mode C 基础上追加重建，适合更难处理的低分辨率片源 |

多数视频可以先从 **Fast + Mode A** 开始。如果 GPU 仍有余量，再尝试 **HQ** 或双阶段模式；如果画面出现过锐化、噪点放大或振铃，退回更轻的模式会更稳。

## 安装使用

1. 前往 [Releases](https://github.com/yorkyang2333/iina-anime4k/releases) 下载 `anime4k.iinaplgz`，或按下方步骤自行构建。
2. 双击插件包安装到 IINA，或在 IINA 的 `设置 -> 插件` 中手动安装。
3. 打开任意视频，显示 IINA 侧边栏，切换到 **Anime4K** 标签页，然后选择质量档位和预设模式。

## 从源码构建

构建前请准备：

- 已安装 IINA 的 macOS 环境
- Node.js 与 npm
- Python 3
- Git 子模块，因为上游 Anime4K 着色器位于 `Anime4K/`

```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```

构建完成后，仓库根目录会生成 `anime4k.iinaplgz` 插件包。

## 开发说明

- `src/index.js` 是 IINA 插件运行时，负责安装 shader、持久化状态、菜单、侧边栏通信、OSD 和自动应用。
- `src/shaders.js` 定义 Fast/HQ 两档预设链路。
- `ui/sidebar/` 存放侧边栏 Web UI。
- `build-shaders.py` 会读取 `Anime4K/glsl/**/*.glsl`，生成 `src/shaders-data.js`。
- `dist/`、`src/shaders-data.js`、`anime4k.iinaplugin/` 和 `anime4k.iinaplgz` 都是构建产物，已按预期被 Git 忽略。
