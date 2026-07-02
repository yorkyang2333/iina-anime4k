<div align="center">

# 🌸 Anime4K for IINA

**Плагин для улучшения качества аниме и апскейлинга в реальном времени для плеера macOS IINA**

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

**Anime4K for IINA** — это современный плагин для плеера macOS [IINA](https://iina.io/), который упаковывает знаменитые шейдеры реального времени [Anime4K](https://github.com/bloc97/Anime4K) (GLSL) и обеспечивает их полную интеграцию. При первом запуске плагин автоматически устанавливает встроенные шейдеры в директорию данных плагина IINA, а во время воспроизведения динамически управляет списком `glsl-shaders` в пплеере mpv без необходимости ручного редактирования файла `mpv.conf` или настройки путей!

## ✨ Ключевые возможности

* 🚀 **Нативная интеграция с IINA**: Полный контроль через выделенную вкладку на боковой панели, верхнюю строку меню macOS и встроенные уведомления (OSD) прямо во время просмотра.
* 🌐 **Поддержка 54 языков**: Полная синхронизация со всеми 54 языками, официально поддерживаемыми IINA, включая точный перевод интерфейса и автоматическое определение языка системы.
* ⚖️ **Два уровня качества (Quality Tiers)**:
  * **Fast**: Легковесный и быстрый режим, оптимизированный для стандартных чипов Apple Silicon и Intel Mac.
  * **HQ**: Продвинутые многопроходные цепочки шейдеров для производительных графических процессоров (чипы M-серии Pro/Max/Ultra).
* 🎛️ **Шесть пресетов**: Мгновенное переключение между режимами **Mode A, B, C, A+A, B+B и C+A** прямо во время воспроизведения видео.
* 🔄 **Умное автоприменение (Auto-Apply)**: Автоматически восстанавливает выбранный режим улучшения и уровень качества при загрузке каждого нового видео.
* ⌨️ **Горячие клавиши**: Быстрое управление с клавиатуры (`1`–`6` для переключения пресетов, `0` для отключения, `7` для режима Fast и `8` для режима HQ).

## 📖 Руководство по пресетам

| Пресет | Рекомендуемое применение и начальный выбор |
| :---: | :--- |
| **Mode A** | Большинство аниме в разрешении **1080p**, а также видео с небольшой размытостью или артефактами сжатия |
| **Mode B** | Аниме в разрешении **720p**, либо видео, где Mode A выглядит слишком резким или неестественным |
| **Mode C** | Старое аниме в разрешении **480p / SD**, видео с заметным шумом, или контент, требующий первоначального шумоподавления |
| **Mode A+A** | Двухпроходная цепочка Mode A; высочайшее качество, повышенная нагрузка на GPU и более агрессивная резкость |
| **Mode B+B** | Двухпроходная цепочка Mode B; высочайшее качество, повышенная нагрузка на GPU и более агрессивная резкость |
| **Mode C+A** | Комбинация шумоподавления Mode C и дополнительной реконструкции деталей; идеально для сложных видео низкого разрешения |

> [!TIP]
> Для большинства аниме мы рекомендуем начать с комбинации **Fast + Mode A**. Если производительность вашего Mac позволяет, попробуйте переключиться на режим **HQ** или двухпроходные цепочки (`A+A`, `B+B`, `C+A`). Если изображение становится слишком резким, вокруг контуров появляются белые ореолы (рингинг) или усиливается шум, переключитесь на более мягкий режим Mode B или Mode C.

## 🚀 Установка и использование

1. Перейдите на страницу [**Releases**](https://github.com/yorkyang2333/iina-anime4k/releases) и скачайте актуальную версию пакета `anime4k.iinaplgz`.
2. Дважды щелкните скачанный файл `.iinaplgz` для автоматической установки в IINA, либо откройте IINA и перейдите в `Настройки -> Плагины` для ручной установки.
3. Откройте любое аниме, вызовите боковую панель IINA, перейдите на вкладку **Anime4K** и выберите подходящий уровень качества и режим!

## 🛠️ Сборка из исходного кода

### Требования к окружению
* **macOS** с установленным плеером [IINA](https://iina.io/)
* **Node.js** и **npm**
* **Python 3**
* **Git** (с поддержкой сабмодулей для загрузки оригинальных шейдеров Anime4K)

### Команды для сборки
```bash
git clone https://github.com/yorkyang2333/iina-anime4k.git
cd iina-anime4k
git submodule update --init --recursive
npm install
npm run pack
```
После завершения сборки в корневом каталоге репозитория появится готовый установочный пакет `anime4k.iinaplgz`.

## 👨‍💻 Примечания для разработчиков

* `src/index.js` — Ядро плагина (установка шейдеров, сохранение состояния, синхронизация меню, сообщения OSD и логика автоприменения).
* `src/shaders.js` — Конфигурация и привязка параметров для цепочек Fast и HQ.
* `src/i18n.js` — Полный словарь локализации на 54 языка и модуль определения системного языка.
* `ui/sidebar/` — Веб-интерфейс и стили для боковой панели IINA.
* `build-shaders.py` — Скрипт предварительной компиляции, который обрабатывает файлы `Anime4K/glsl/**/*.glsl` и генерирует `src/shaders-data.js`.

## 🤝 Сообщество и ссылки

[![LINUXDO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUXDO-0086c9?style=for-the-badge&labelColor=555555)](https://linux.do)
