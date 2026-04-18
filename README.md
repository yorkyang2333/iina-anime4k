# Anime4K for IINA 

[简体中文](README_zh-CN.md)

### Project Overview
**Anime4K for IINA** is a native macOS plugin that integrates the renowned [Anime4K](https://github.com/bloc97/Anime4K) high-quality, real-time anime upscaling shaders directly into the [IINA media player](https://iina.io/). 

Our goal is to completely eliminate manual configurations—bringing you a plug-and-play, seamless experience for real-time anime upscaling directly from within IINA.

### Advantages
- **Native UI Integration**: Fully integrated into IINA's plugin system via an intuitive sidebar and menu items. No more messing with manual `mpv.conf` edits or complicated shader paths.
- **On-the-Fly Control**: Dynamically switch between quality presets (*Fast* / *High Quality*) and enhancement modes (*Mode A/B/C*) directly through the UI during playback.
- **Automated Management**: Ships with built-in shader bundling and automatic dynamic injection logic. It just works.
- **Keyboard Shortcuts**: Control enhancements, toggle modes, and fine-tune your viewing experience without interrupting your media.

### How to Compile
To compile the plugin from source, ensure you have **Node.js** and **npm** installed on your system. Python 3 is also required to execute the shader bundling script.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/anime4k-iina.git
   cd anime4k-iina
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Build the backend shaders, pack the assets, and generate the final plugin:
   ```bash
   npm run pack
   ```
Once the compilation is complete, you will find a readily packaged `anime4k.iinaplgz` file in the root directory.

### How to Use
> **Note:** If you just want to use the plugin, there is no need to compile it yourself. Pre-compiled versions are readily available.

1. Go to the [Releases](https://github.com/your-username/anime4k-iina/releases) page and download the latest compiled `anime4k.iinaplgz` file.
2. Double-click the downloaded file to automatically install it into IINA, or install it manually via IINA's `Settings -> Plugins` menu.
3. Open a video, toggle the IINA **Sidebar**, switch to the **Anime4K** tab, and configure your preferred upscaling presets. Enjoy the enhanced visuals immediately!
