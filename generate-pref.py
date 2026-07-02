#!/usr/bin/env python3
import json
import re

with open("src/i18n.js", "r", encoding="utf-8") as f:
    text = f.read()

start = text.find("const translations = {") + len("const translations = ")
end = text.find("};\n\nlet currentLocale") + 1
trans_json = text[start:end]
data = json.loads(trans_json)

custom_help = {
    "en": {
        "helpLang": "Select the display language for Anime4K OSD and side panel.",
        "helpAutoApply": "Automatically enable upscaling when opening new video files.",
    },
    "zh-Hans": {
        "helpLang": "选择 Anime4K 屏幕提示 (OSD) 与控制台的显示语言。",
        "helpAutoApply": "在播放新视频时自动加载上次的优化模式。",
    },
    "zh-Hant": {
        "helpLang": "選擇 Anime4K 螢幕提示 (OSD) 與控制台的顯示語言。",
        "helpAutoApply": "在播放新影片時自動載入上次的優化模式。",
    },
    "ja": {
        "helpLang": "Anime4KのOSDおよびサイドパネルの表示言語を選択します。",
        "helpAutoApply": "新しい動画ファイルを再生する際に自動的に高画質化を有効にします。",
    },
    "ko": {
        "helpLang": "Anime4K OSD 및 사이드 패널의 표시 언어를 선택합니다.",
        "helpAutoApply": "새 동영상을 재생할 때 자동으로 업스케일링을 활성화합니다.",
    },
    "es": {
        "helpLang": "Seleccione el idioma de visualización para el OSD y el panel lateral de Anime4K.",
        "helpAutoApply": "Habilitar automáticamente el escalado al abrir nuevos archivos de vídeo.",
    },
    "fr": {
        "helpLang": "Sélectionnez la langue d'affichage pour l'OSD et le panneau latéral d'Anime4K.",
        "helpAutoApply": "Activer automatiquement la mise à l'échelle lors de l'ouverture de nouvelles vidéos.",
    },
    "de": {
        "helpLang": "Wählen Sie die Anzeigesprache für das Anime4K-OSD und das Seitenpanel.",
        "helpAutoApply": "Hochskalierung beim Öffnen neuer Videodateien automatisch aktivieren.",
    },
    "ru": {
        "helpLang": "Выберите язык интерфейса для OSD и боковой панели Anime4K.",
        "helpAutoApply": "Автоматически включать масштабирование при открытии новых видеофайлов.",
    },
}

sys_word_map = {
    "en": "System Default",
    "zh-Hans": "系统默认",
    "zh-Hant": "系統預設",
    "ja": "システムデフォルト",
    "ko": "시스템 기본값",
    "es": "Predeterminado del sistema",
    "fr": "Par défaut du système",
    "de": "Systemstandard",
    "ru": "По умолчанию",
    "ar": "الافتراضي للنظام",
    "pt": "Padrão do sistema",
    "pt-BR": "Padrão do sistema",
    "it": "Predefinito di sistema",
    "nl": "Systeemstandaard",
    "pl": "Domyślny systemowy",
    "tr": "Sistem Varsayılanı",
    "vi": "Mặc định hệ thống",
    "th": "ค่าเริ่มต้นระบบ",
    "id": "Bawaan Sistem",
    "uk": "За замовчуванням",
}

pref_translations = {}
for loc, t in data.items():
    custom = custom_help.get(loc, {})
    pref_translations[loc] = {
        "lblLang": f"{t.get('language', 'Language')}:",
        "helpLang": custom.get("helpLang")
        or f"{t.get('language', 'Language')} ({t.get('auto', 'Auto')}) — {t.get('subtitle', '')}",
        "lblAutoApply": t.get("autoApplyMenu", t.get("autoApply", "Auto-apply")),
        "helpAutoApply": custom.get("helpAutoApply") or t.get("autoApply", ""),
        "autoWord": t.get("auto", "Auto"),
        "sysWord": sys_word_map.get(loc, "System Default"),
    }

# Read locale names from src/i18n.js
start_names = (
    text.find("export const localeNames = {") + len("export const localeNames = ") - 1
)
end_names = text.find("};\n\nconst translations = {") + 1
names_json = text[start_names:end_names]
locale_names = json.loads(names_json)

options_html = ['        <option value="auto" id="opt-auto">Auto (System Default)</option>']
for loc, name in locale_names.items():
    options_html.append(f'        <option value="{loc}">{name}</option>')
options_str = "\n".join(options_html)

translations_str = json.dumps(pref_translations, ensure_ascii=False, indent=6)
translations_str_formatted = "\n".join(
    ["      " + line if i > 0 else line for i, line in enumerate(translations_str.splitlines())]
)

locale_names_str = json.dumps(locale_names, ensure_ascii=False, indent=6)
locale_names_str_formatted = "\n".join(
    ["      " + line if i > 0 else line for i, line in enumerate(locale_names_str.splitlines())]
)

html_content = f"""<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Anime4K Preferences</title>
  <style>
    * {{
      box-sizing: border-box;
    }}

    html {{
      margin: 0;
      padding: 0;
    }}

    body {{
      padding: 16px 20px;
      margin: 0;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color: var(--text-color, #333);
    }}

    @media (prefers-color-scheme: dark) {{
      body {{
        color: #eee;
      }}
      select {{
        background-color: #2c2c2e;
        color: #fff;
        border: 1px solid #555;
      }}
    }}

    p {{
      margin: 0;
    }}

    small,
    .small {{
      font-size: 11px;
    }}

    .secondary {{
      color: rgba(128, 128, 128, 0.85);
    }}

    .pref-section {{
      margin-bottom: 18px;
    }}

    .pref-help {{
      margin-top: 4px;
      line-height: 1.4;
    }}

    select {{
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 13px;
      outline: none;
    }}

    label {{
      cursor: pointer;
    }}
  </style>
</head>

<body>
  <div class="pref-section">
    <span id="lbl-lang" style="font-weight: 500;">Language:</span>
    <p class="small secondary pref-help" id="help-lang">
      Select the display language for Anime4K OSD and side panel.
    </p>
    <div style="margin-top: 6px">
      <input type="text" id="pref-lang-input" data-pref-key="lang" style="display: none;" />
      <select id="pref-lang" style="width: 100%; max-width: 280px;">
{options_str}
      </select>
    </div>
  </div>

  <div class="pref-section">
    <label>
      <input type="checkbox" data-type="bool" data-pref-key="autoApply" />
      <span id="lbl-autoApply" style="font-weight: 500;">Auto-apply Anime4K on video load</span>
    </label>
    <p class="small secondary pref-help" id="help-autoApply" style="margin-left: 20px;">
      Automatically enable upscaling when opening new video files.
    </p>
  </div>

  <script>
    (function () {{
      const translations = {translations_str_formatted};
      const localeNames = {locale_names_str_formatted};

      function resolveLang(code) {{
        if (!code || code === "auto") {{
          let sys = (navigator.language || "en").toLowerCase();
          if (sys.includes("zh")) {{
            return (sys.includes("hant") || sys.includes("tw") || sys.includes("hk")) ? "zh-Hant" : "zh-Hans";
          }}
          if (sys.includes("pt")) {{
            return sys.includes("br") ? "pt-BR" : "pt";
          }}
          if (sys.includes("en")) {{
            return (sys === "en-gb" || sys === "en-au" || sys === "en-nz") ? "en-GB" : "en";
          }}
          const base = sys.split("-")[0];
          return translations[base] ? base : "en";
        }}
        if (translations[code]) return code;
        const short = code.split("-")[0];
        return translations[short] ? short : "en";
      }}

      function updateUI() {{
        const select = document.getElementById("pref-lang");
        if (!select) return;
        const code = resolveLang(select.value);
        const t = translations[code] || translations["en"];

        const el = (id, text) => {{
          const node = document.getElementById(id);
          if (node && text) node.textContent = text;
        }};

        el("lbl-lang", t.lblLang);
        el("help-lang", t.helpLang);
        el("lbl-autoApply", t.lblAutoApply);
        el("help-autoApply", t.helpAutoApply);

        const sysCode = resolveLang("auto");
        const sysName = localeNames[sysCode] || sysCode;
        const autoText = `${{t.autoWord}} (${{t.sysWord}}: ${{sysName}})`;
        el("opt-auto", autoText);
      }}

      const select = document.getElementById("pref-lang");
      const input = document.getElementById("pref-lang-input");
      if (select && input) {{
        function saveLang(val) {{
          input.value = val;
          input.dispatchEvent(new Event("input", {{ bubbles: true }}));
          input.dispatchEvent(new Event("change", {{ bubbles: true }}));
          if (typeof iina !== "undefined" && iina.preferences) {{
            try {{
              iina.preferences.set("lang", val);
              iina.preferences.sync();
            }} catch (e) {{}}
          }} else if (window.iina && window.iina.preferences) {{
            try {{
              window.iina.preferences.set("lang", val);
              window.iina.preferences.sync();
            }} catch (e) {{}}
          }}
        }}

        select.addEventListener("change", () => {{
          saveLang(select.value);
          updateUI();
        }});

        let lastVal = select.value;
        let lastInputVal = input.value;
        setInterval(() => {{
          if (input.value && input.value !== lastInputVal) {{
            lastInputVal = input.value;
            if (select.value !== input.value) {{
              select.value = input.value;
              lastVal = select.value;
              updateUI();
            }}
          }}
          if (select.value !== lastVal) {{
            lastVal = select.value;
            saveLang(select.value);
            lastInputVal = input.value;
            updateUI();
          }}
        }}, 100);
      }}
      updateUI();
    }})();
  </script>
</body>

</html>
"""

with open("pref.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Successfully generated pref.html with", len(pref_translations), "locales!")
