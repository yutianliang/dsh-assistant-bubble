window.__ModuleLoader__.load({
  id: "dsh-assistant-bubble",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    const React = require("react");
    let Switch = null;
    try { Switch = require("@deepseek-ai/dsh-client-ui-primitives").Switch; } catch (error) { Switch = null; }

    const CSS = "/* dsh-assistant-bubble：助手回复气泡底 + 液态玻璃挡。\n   锚点 data-chat-flow-kind=\"assistant-step\" 由宿主写在每条消息行上；\n   _root > _body 是宿主 CSS-Module 的类名后缀（哈希会变、后缀不变）。\n   所有可调参数都走下面的 CSS 变量，设置页把用户值内联写到 body 上。\n   层叠顺序：基础浅 → 基础深 → 玻璃浅 → 玻璃深；玻璃挡选择器带 body[data-dab-glass]，\n   特异性高于基础挡，且 backdrop-filter 两条都带 !important（否则会被基础挡的 none 压掉）。 */\nbody {\n  --dab-solid-color: 255, 255, 255;\n  --dab-solid-alpha: 0.6;\n  --dab-glass-color: 255, 255, 255;\n  --dab-glass-alpha: 0.4;\n  --dab-blur: 3px;\n  --dab-sheen: 1;\n}\nbody[data-ds-dark-theme] {\n  --dab-solid-color: 26, 28, 34;\n  --dab-solid-alpha: 0.6;\n  --dab-glass-color: 18, 20, 26;\n  --dab-glass-alpha: 0.4;\n  --dab-blur: 3px;\n  --dab-sheen: 1;\n}\n\n/* 基础挡：实心气泡 */\n[data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"] {\n  background: rgba(var(--dab-solid-color), var(--dab-solid-alpha)) !important;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 14px;\n  padding: 12px 16px;\n  width: fit-content;\n  max-width: min(760px, 100%);\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n}\nbody[data-ds-dark-theme] [data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"] {\n  border-color: rgba(255, 255, 255, 0.10);\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);\n}\n\n/* 液态玻璃挡：配方对齐 dsh-plugin-wallpaper-engine 的玻璃面 ——\n   白釉渐变 + blur(var(--dab-blur)) saturate(1.3) brightness(1.04) + 双向内阴影折射 + 落地阴影。 */\nbody[data-dab-glass] [data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"] {\n  background: rgba(var(--dab-glass-color), var(--dab-glass-alpha)) !important;\n  background-image: linear-gradient(180deg, rgba(255, 255, 255, calc(0.16 * var(--dab-sheen, 1))), rgba(255, 255, 255, calc(0.05 * var(--dab-sheen, 1))) 38%, rgba(255, 255, 255, calc(0.02 * var(--dab-sheen, 1)))) !important;\n  border-color: rgba(255, 255, 255, 0.5);\n  -webkit-backdrop-filter: blur(var(--dab-blur, 16px)) saturate(1.3) brightness(1.04) contrast(1.01) !important;\n  backdrop-filter: blur(var(--dab-blur, 16px)) saturate(1.3) brightness(1.04) contrast(1.01) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.32 * var(--dab-sheen, 1))),\n    inset 0 -1px 0 rgba(255, 255, 255, calc(0.08 * var(--dab-sheen, 1))),\n    inset 0 0 0 0.5px rgba(255, 255, 255, calc(0.08 * var(--dab-sheen, 1))),\n    0 12px 40px rgba(0, 0, 0, 0.12);\n}\nbody[data-ds-dark-theme][data-dab-glass] [data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"] {\n  border-color: rgba(255, 255, 255, 0.18);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.22 * var(--dab-sheen, 1))),\n    inset 0 -1px 0 rgba(255, 255, 255, calc(0.06 * var(--dab-sheen, 1))),\n    inset 0 0 0 0.5px rgba(255, 255, 255, calc(0.08 * var(--dab-sheen, 1))),\n    0 12px 40px rgba(0, 0, 0, 0.4);\n}\n\n/* 无障碍：系统开了「减少透明度」时不磨砂、不上釉，只保留玻璃底色（文字照样清楚）。 */\n@media (prefers-reduced-transparency: reduce) {\n  body[data-dab-glass] [data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"] {\n    background-image: none !important;\n    -webkit-backdrop-filter: none !important;\n    backdrop-filter: none !important;\n  }\n}\n/* ── 周边行：与气泡同材质、尺寸更小，由 body[data-dab-chrome] 单独开关 ──────────────\n   覆盖七处：工具条图标行、过程折叠行、过程分组头（运行中）、思考触发条、会话统计行、\n   上下文占用环、运行行。\n   ⚠️ 工具条的气泡挂在**图标行**（`.actions`）而不是 `[data-turn-tail]` 容器上：后者是\n   flex column + gap:16px、且带一个默认空的 tail 插槽，气泡挂上去会把图标行压到下半部分。 */\nbody[data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-dab-chrome] [data-turn-process],\nbody[data-dab-chrome] [data-turn-trigger],\nbody[data-dab-chrome] [data-process-activity],\nbody[data-dab-chrome] [data-composer-stats],\nbody[data-dab-chrome] [data-chat-running],\nbody[data-dab-chrome] button[class*=\"_trigger\"]:has(> svg[viewBox=\"0 0 14 14\"]) {\n  background: rgba(var(--dab-solid-color), var(--dab-solid-alpha)) !important;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 10px;\n  padding: 4px 10px;\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n}\nbody[data-ds-dark-theme][data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-ds-dark-theme][data-dab-chrome] [data-turn-process],\nbody[data-ds-dark-theme][data-dab-chrome] [data-turn-trigger],\nbody[data-ds-dark-theme][data-dab-chrome] [data-process-activity],\nbody[data-ds-dark-theme][data-dab-chrome] [data-composer-stats],\nbody[data-ds-dark-theme][data-dab-chrome] [data-chat-running],\nbody[data-ds-dark-theme][data-dab-chrome] button[class*=\"_trigger\"]:has(> svg[viewBox=\"0 0 14 14\"]) {\n  border-color: rgba(255, 255, 255, 0.08);\n}\nbody[data-dab-glass][data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-dab-glass][data-dab-chrome] [data-turn-process],\nbody[data-dab-glass][data-dab-chrome] [data-turn-trigger],\nbody[data-dab-glass][data-dab-chrome] [data-process-activity],\nbody[data-dab-glass][data-dab-chrome] [data-composer-stats],\nbody[data-dab-glass][data-dab-chrome] [data-chat-running],\nbody[data-dab-glass][data-dab-chrome] button[class*=\"_trigger\"]:has(> svg[viewBox=\"0 0 14 14\"]) {\n  background: rgba(var(--dab-glass-color), var(--dab-glass-alpha)) !important;\n  background-image: linear-gradient(180deg, rgba(255, 255, 255, calc(0.12 * var(--dab-sheen, 1))), rgba(255, 255, 255, calc(0.04 * var(--dab-sheen, 1))) 38%, rgba(255, 255, 255, calc(0.02 * var(--dab-sheen, 1)))) !important;\n  border-color: rgba(255, 255, 255, 0.35);\n  -webkit-backdrop-filter: blur(var(--dab-blur, 16px)) saturate(1.3) brightness(1.04) contrast(1.01) !important;\n  backdrop-filter: blur(var(--dab-blur, 16px)) saturate(1.3) brightness(1.04) contrast(1.01) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.20 * var(--dab-sheen, 1))),\n    inset 0 -1px 0 rgba(255, 255, 255, calc(0.05 * var(--dab-sheen, 1))),\n    inset 0 0 0 0.5px rgba(255, 255, 255, calc(0.06 * var(--dab-sheen, 1))),\n    0 8px 24px rgba(0, 0, 0, 0.08);\n}\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-turn-process],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-turn-trigger],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-process-activity],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-composer-stats],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-chat-running],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] button[class*=\"_trigger\"]:has(> svg[viewBox=\"0 0 14 14\"]) {\n  border-color: rgba(255, 255, 255, 0.14);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.16 * var(--dab-sheen, 1))),\n    inset 0 -1px 0 rgba(255, 255, 255, calc(0.04 * var(--dab-sheen, 1))),\n    inset 0 0 0 0.5px rgba(255, 255, 255, calc(0.06 * var(--dab-sheen, 1))),\n    0 8px 24px rgba(0, 0, 0, 0.32);\n}\n\n/* 工具条：中和宿主自己的留白（.actions 的 -6px 左缩进 / 4px 上间距、时间列的 12px 右留白），\n   内边距取左右对称的 12px；四组各写一次（玻璃组特异性更高）。 */\nbody[data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-ds-dark-theme][data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-dab-glass][data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-ds-dark-theme][data-dab-glass][data-dab-chrome] [data-turn-tail] [class*=\"_actions\"] {\n  padding: 4px 12px;\n  margin: 0 !important;\n}\nbody[data-dab-chrome] [data-turn-tail] [class*=\"_timeEnd\"] {\n  padding-right: 0 !important;\n}\n\n/* 跟随文字长度：过程折叠行（宿主 width:100%）、过程分组头、思考触发条不再拉满整行；\n   工具条图标行（宿主是块级 flex ⇒ 宽度撑满）同样收成内容宽度。 */\nbody[data-dab-chrome] [data-turn-process],\nbody[data-dab-chrome] [data-process-activity],\nbody[data-dab-chrome] [data-turn-trigger],\nbody[data-dab-chrome] [data-turn-tail] [class*=\"_actions\"] {\n  width: fit-content !important;\n  max-width: 100%;\n}\n\n/* 操作条常驻：宿主给非最后一条回复设 data-actions-reveal=\"hover\"（CSS 里 .actions opacity:0），\n   这里取消该门控（用户口径：不加开关）。 */\n[data-actions-reveal=\"hover\"] [class*=\"_actions\"] {\n  opacity: 1 !important;\n}\n\n/* 统计行与上下文环等高（两者宿主行高/内边距来源不同，以统计行为准对齐）。 */\nbody[data-dab-chrome] [data-composer-stats],\nbody[data-dab-chrome] button[class*=\"_trigger\"]:has(> svg[viewBox=\"0 0 14 14\"]) {\n  box-sizing: border-box;\n  height: 30px;\n  padding: 0 10px;\n  align-items: center;\n}\n\n/* 无障碍：系统开「减少透明度」时周边行也不磨砂、不上釉。 */\n@media (prefers-reduced-transparency: reduce) {\nbody[data-dab-chrome] [data-turn-tail] [class*=\"_actions\"],\nbody[data-dab-chrome] [data-turn-process],\nbody[data-dab-chrome] [data-turn-trigger],\nbody[data-dab-chrome] [data-process-activity],\nbody[data-dab-chrome] [data-composer-stats],\nbody[data-dab-chrome] [data-chat-running],\nbody[data-dab-chrome] button[class*=\"_trigger\"]:has(> svg[viewBox=\"0 0 14 14\"]) {\n    background-image: none !important;\n    -webkit-backdrop-filter: none !important;\n    backdrop-filter: none !important;\n  }\n}\n\n/* ── 宽表格（.md-table-wide）：宿主让它按**滚动容器**整屏出血 ——\n   --dsh-table-spare/lead 由 100cqw（滚动区宽度）算出、与气泡宽度无关，\n   所以宽度受限的气泡永远盖不住它（表格会戳出气泡左右）。\n   处理：含宽表格的消息气泡放宽到整列宽；表格拉回气泡内容宽，超出部分自己横向滚动。 */\n[data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"]:has(.md-table-wide) {\n  width: auto !important;\n  max-width: 100% !important;\n}\n[data-chat-flow-kind=\"assistant-step\"] div[class*=\"_root\"] > div[class*=\"_body\"] .md-table-wide {\n  --dsh-table-spare: 0px !important;\n  --dsh-table-lead: 0px !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  margin-left: 0 !important;\n  padding-left: 0 !important;\n  overflow-x: auto;\n}\n";
    const SETTINGS_KEY = "dsh-assistant-bubble:settings";
    const LEGACY_ALPHA_KEY = "dsh-assistant-bubble:opacity";
    const LEGACY_GLASS_KEY = "dsh-assistant-bubble:glass";
    const LOCALE = "settings.assistantBubble";
    const TINTS = ["#ffffff", "#12141a", "#7fd8e8", "#f2a2c0", "#f2b866", "#e06060"];
    const ALPHA_MIN = 0, ALPHA_MAX = 1, ALPHA_STEP = 0.05;
    const BLUR_MIN = 0, BLUR_MAX = 40, BLUR_STEP = 1;
    const SHEEN_MIN = 0, SHEEN_MAX = 2, SHEEN_STEP = 0.1;

    /** 出厂默认值：取自用户 2026-10-14 实际调好的一套（浅色玻璃色 #ffffff、深色 #12141a）。 */
    const DEFAULTS = {
      glass: true,
      chrome: true,
      darkSeparate: false,
      light: { solid: 0.6, glassAlpha: 0.4, blur: 3, sheen: 1, tint: "#ffffff" },
      dark: { solid: 0.6, glassAlpha: 0.4, blur: 3, sheen: 1, tint: "#12141a" }
    };

    const en = {
      nav: "Assistant bubble",
      title: "Assistant reply bubble",
      intro: "Give the assistant reply a bubble of its own, with an optional liquid-glass material.",
      chrome: "Chrome rows",
      chromeHint: "Toolbar, process row, trigger row and stats row get the same bubble material.",
      glass: "Liquid glass",
      glassHint: "Specular sheen, blur and thick-glass refraction. Off = a plain solid bubble.",
      solid: "Bubble opacity",
      solidHint: "Fill strength while liquid glass is off.",
      glassAlpha: "Glass fill strength",
      glassAlphaHint: "Fill strength under liquid glass; higher is less see-through.",
      blur: "Frost",
      blurHint: "Blur radius of the glass.",
      sheen: "Sheen strength",
      sheenHint: "Specular highlight and glass-edge refraction. 100% is the default look.",
      tint: "Glass colour",
      tintHint: "Tint of the glass; pick a swatch or use the colour picker.",
      custom: "Custom",
      darkSeparate: "Separate dark settings",
      darkSeparateHint: "Let the dark theme use its own values."
    };
    const zh = {
      nav: "助手回复气泡",
      title: "助手回复气泡",
      intro: "给助手的回复加一层自己的气泡底，可选液态玻璃材质。",
      chrome: "周边信息同步",
      chromeHint: "工具条、过程折叠行、思考触发条与统计行也用同一份气泡材质。",
      glass: "液态玻璃",
      glassHint: "白釉高光 + 模糊 + 厚玻璃折射；关掉就是平实心气泡。",
      solid: "气泡不透明度",
      solidHint: "关闭液态玻璃时的底色浓度。",
      glassAlpha: "玻璃底色浓度",
      glassAlphaHint: "液态玻璃挡下的底色浓度，越高越不透。",
      blur: "雾化",
      blurHint: "玻璃的模糊半径。",
      sheen: "白釉强度",
      sheenHint: "玻璃表面的白釉高光与边缘折射，100% 为默认观感。",
      tint: "玻璃颜色",
      tintHint: "玻璃底色；可选色块或用取色器自定义。",
      custom: "自定义",
      darkSeparate: "深色单独设置",
      darkSeparateHint: "打开后，深色主题用另一套参数。"
    };

    function clone(value) { return JSON.parse(JSON.stringify(value)); }

    /** 数字解析：null / undefined / 空串 / NaN 都回退到 fallback，再夹到 [min, max]。 */
    function readNumber(raw, fallback, min, max) {
      if (raw === null || raw === void 0 || raw === "") return fallback;
      const value = Number(raw);
      if (!Number.isFinite(value)) return fallback;
      if (min !== void 0 && value < min) return min;
      if (max !== void 0 && value > max) return max;
      return value;
    }

    /** 颜色归一化：接受 3/6 位 hex（可带 #），统一成小写 6 位；非法给 null。 */
    function normalizeTint(raw) {
      if (typeof raw !== "string") return null;
      const text = raw.trim().replace(/^#/, "").toLowerCase();
      if (/^[0-9a-f]{3}$/.test(text)) return "#" + text.split("").map((c) => c + c).join("");
      if (/^[0-9a-f]{6}$/.test(text)) return "#" + text;
      return null;
    }

    function hexToRgb(hex) {
      const normalized = normalizeTint(hex) ?? "#ffffff";
      const text = normalized.slice(1);
      return [0, 2, 4].map((i) => String(parseInt(text.slice(i, i + 2), 16))).join(", ");
    }

    /** 读设置：新键优先，其次兼容 v2/v3 的两个旧键；坏值一律回退默认。 */
    function readSettings() {
      let stored = null;
      try { stored = JSON.parse(window.localStorage.getItem(SETTINGS_KEY) ?? "null"); } catch (error) { stored = null; }
      const settings = clone(DEFAULTS);
      if (stored !== null && typeof stored === "object" && !Array.isArray(stored)) {
        if (typeof stored.glass === "boolean") settings.glass = stored.glass;
        if (typeof stored.darkSeparate === "boolean") settings.darkSeparate = stored.darkSeparate;
        if (typeof stored.chrome === "boolean") settings.chrome = stored.chrome;
        for (const group of ["light", "dark"]) {
          const raw = stored[group];
          if (raw === null || typeof raw !== "object") continue;
          settings[group].solid = readNumber(raw.solid, settings[group].solid, ALPHA_MIN, ALPHA_MAX);
          settings[group].glassAlpha = readNumber(raw.glassAlpha, settings[group].glassAlpha, ALPHA_MIN, ALPHA_MAX);
          settings[group].blur = readNumber(raw.blur, settings[group].blur, BLUR_MIN, BLUR_MAX);
          settings[group].sheen = readNumber(raw.sheen, settings[group].sheen, SHEEN_MIN, SHEEN_MAX);
          const tint = normalizeTint(raw.tint);
          if (tint !== null) settings[group].tint = tint;
        }
        return settings;
      }
      try {
        const legacyAlpha = window.localStorage.getItem(LEGACY_ALPHA_KEY);
        if (legacyAlpha !== null) settings.light.solid = readNumber(legacyAlpha, settings.light.solid, ALPHA_MIN, ALPHA_MAX);
        const legacyGlass = window.localStorage.getItem(LEGACY_GLASS_KEY);
        if (legacyGlass !== null) settings.glass = legacyGlass === "1";
      } catch (error) {}
      return settings;
    }

    function storeSettings(settings) {
      try { window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (error) {}
    }

    function writeGroup(target, group) {
      if (target === null || target === void 0 || target.style === void 0) return;
      target.style.setProperty("--dab-solid-alpha", String(group.solid));
      target.style.setProperty("--dab-glass-alpha", String(group.glassAlpha));
      target.style.setProperty("--dab-blur", group.blur + "px");
      target.style.setProperty("--dab-sheen", String(group.sheen));
      target.style.setProperty("--dab-glass-color", hexToRgb(group.tint));
    }

    /** 应用设置：玻璃开关走 body 门控属性，参数写成 body / 根元素上的内联变量。 */
    function applySettings(settings) {
      try {
        if (typeof document === "undefined") return;
        const active = settings.darkSeparate ? settings.dark : settings.light;
        const body = document.body;
        if (body !== null && body !== void 0) {
          if (settings.glass) body.setAttribute("data-dab-glass", "1");
          else body.removeAttribute("data-dab-glass");
          if (settings.chrome) body.setAttribute("data-dab-chrome", "1");
          else body.removeAttribute("data-dab-chrome");
          writeGroup(body, active);
        }
        writeGroup(document.documentElement, active);
      } catch (error) {}
    }

    function injectStyle() {
      try {
        if (typeof document === "undefined" || document.head === null) return null;
        const existing = document.querySelector('style[data-dsh-assistant-bubble]');
        if (existing !== null) return existing;
        const tag = document.createElement("style");
        tag.dataset.dshAssistantBubble = "1";
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return tag;
      } catch (error) {
        return null;
      }
    }

    function renderSwitch(checked, onChange, label) {
      if (Switch !== null) return React.createElement(Switch, { checked, label, onChange });
      return React.createElement("input", {
        type: "checkbox", checked, "aria-label": label, style: { accentColor: "var(--dsw-alias-brand-primary, #4d6bfe)" },
        onChange: (event) => { onChange(event.target.checked); }
      });
    }

    function SwitchRow(props) {
      return React.createElement("div", { style: rowStyle },
        React.createElement("div", { style: textStyle },
          React.createElement("div", { style: titleStyle }, props.label),
          props.hint === void 0 ? null : React.createElement("div", { style: hintStyle }, props.hint)
        ),
        React.createElement("div", { style: controlStyle }, renderSwitch(props.checked, props.onChange, props.label))
      );
    }

    /** 滑块行：单位由 unit 决定（"%" 按 min..max 换算，其余按原值 + 单位后缀）。 */
    function SliderRow(props) {
      const shown = typeof props.format === "function"
        ? props.format(props.value)
        : props.unit === "%"
          ? Math.round((props.value - props.min) * 100 / (props.max - props.min)) + "%"
          : String(props.value) + props.unit;
      return React.createElement("div", { style: rowStyle },
        React.createElement("div", { style: textStyle },
          React.createElement("div", { style: titleStyle }, props.label),
          props.hint === void 0 ? null : React.createElement("div", { style: hintStyle }, props.hint)
        ),
        React.createElement("div", { style: controlStyle },
          React.createElement("input", {
            type: "range", min: props.min, max: props.max, step: props.step, value: props.value,
            disabled: props.disabled === true,
            "aria-label": props.label,
            style: sliderStyle,
            onChange: (event) => { props.onChange(readNumber(event.target.value, props.value, props.min, props.max)); }
          }),
          React.createElement("span", { style: valueStyle }, shown)
        )
      );
    }

    function TintRow(props) {
      const current = String(props.value).toLowerCase();
      return React.createElement("div", { style: rowStyle },
        React.createElement("div", { style: textStyle },
          React.createElement("div", { style: titleStyle }, props.label),
          props.hint === void 0 ? null : React.createElement("div", { style: hintStyle }, props.hint)
        ),
        React.createElement("div", { style: controlStyle },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } },
            TINTS.map((tint) => React.createElement("button", {
              key: tint, type: "button", title: tint, "aria-label": tint,
              disabled: props.disabled === true,
              onClick: () => { props.onChange(tint); },
              style: current === tint ? swatchActiveStyle(tint) : swatchStyle(tint)
            }))
          ),
          React.createElement("input", {
            type: "color", value: current, title: props.label, "aria-label": props.label,
            disabled: props.disabled === true,
            style: colorInputStyle,
            onChange: (event) => { const next = normalizeTint(event.target.value); if (next !== null) props.onChange(next); }
          }),
          React.createElement("span", { style: hintStyle }, props.customLabel)
        )
      );
    }

    /** 设置 →「助手回复气泡」分区页。 */
    function BubbleSection(props) {
      const t = props.t;
      const [settings, setSettings] = React.useState(readSettings);
      React.useEffect(() => {
        applySettings(settings);
        storeSettings(settings);
      }, [settings]);
      const setField = (group, key, value) => {
        setSettings((previous) => {
          const next = clone(previous);
          (group === "dark" ? next.dark : next.light)[key] = value;
          return next;
        });
      };
      const activeGroup = settings.darkSeparate ? "dark" : "light";
      const active = settings.darkSeparate ? settings.dark : settings.light;
      const rows = [
        React.createElement(SwitchRow, { key: "glass", label: t("glass"), hint: t("glassHint"),
          checked: settings.glass, onChange: (value) => { setSettings((previous) => { const next = clone(previous); next.glass = value; return next; }); } }),
        React.createElement(SwitchRow, { key: "chrome", label: t("chrome"), hint: t("chromeHint"),
          checked: settings.chrome, onChange: (value) => { setSettings((previous) => { const next = clone(previous); next.chrome = value; return next; }); } }),
        React.createElement(SliderRow, { key: "solid", label: t("solid"), hint: t("solidHint"), unit: "%",
          min: ALPHA_MIN, max: ALPHA_MAX, step: ALPHA_STEP, value: active.solid, disabled: settings.glass,
          onChange: (value) => { setField(activeGroup, "solid", value); } }),
        React.createElement(SliderRow, { key: "glassAlpha", label: t("glassAlpha"), hint: t("glassAlphaHint"), unit: "%",
          min: ALPHA_MIN, max: ALPHA_MAX, step: ALPHA_STEP, value: active.glassAlpha, disabled: !settings.glass,
          onChange: (value) => { setField(activeGroup, "glassAlpha", value); } }),
        React.createElement(SliderRow, { key: "blur", label: t("blur"), hint: t("blurHint"), unit: "px",
          min: BLUR_MIN, max: BLUR_MAX, step: BLUR_STEP, value: active.blur, disabled: !settings.glass,
          onChange: (value) => { setField(activeGroup, "blur", value); } }),
        React.createElement(TintRow, { key: "tint", label: t("tint"), hint: t("tintHint"), customLabel: t("custom"),
          value: active.tint, disabled: !settings.glass,
          onChange: (value) => { setField(activeGroup, "tint", value); } }),
        React.createElement(SliderRow, { key: "sheen", label: t("sheen"), hint: t("sheenHint"),
          min: SHEEN_MIN, max: SHEEN_MAX, step: SHEEN_STEP, value: active.sheen, disabled: !settings.glass,
          format: (value) => Math.round(value * 100) + "%",
          onChange: (value) => { setField(activeGroup, "sheen", value); } }),
        React.createElement(SwitchRow, { key: "darkSeparate", label: t("darkSeparate"), hint: t("darkSeparateHint"),
          checked: settings.darkSeparate, onChange: (value) => { setSettings((previous) => { const next = clone(previous); next.darkSeparate = value; return next; }); } })
      ];
      return React.createElement("div", { style: { padding: "4px 0" } },
        React.createElement("div", { style: { paddingBottom: "8px" } },
          React.createElement("div", { style: sectionTitleStyle }, t("title")),
          React.createElement("div", { style: hintStyle }, t("intro"))
        ),
        rows
      );
    }

    const rowStyle = {
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap",
      padding: "14px 0", borderBottom: "0.5px solid var(--dsw-alias-border-l2, rgba(128,128,128,0.25))"
    };
    const textStyle = { minWidth: 0 };
    const sectionTitleStyle = { fontSize: "15px", lineHeight: "22px", fontWeight: "600" };
    const titleStyle = { fontSize: "14px", lineHeight: "20px" };
    const hintStyle = { fontSize: "12px", lineHeight: "18px", marginTop: "4px", color: "var(--dsw-alias-label-secondary, inherit)" };
    const controlStyle = { display: "flex", alignItems: "center", gap: "12px", flex: "0 0 auto" };
    const sliderStyle = { width: "160px", accentColor: "var(--dsw-alias-brand-primary, #4d6bfe)" };
    const valueStyle = { fontSize: "12px", fontVariantNumeric: "tabular-nums", textAlign: "right", width: "46px", color: "var(--dsw-alias-label-secondary, inherit)" };
    const colorInputStyle = { width: "28px", height: "28px", padding: "0", border: "none", background: "transparent", cursor: "pointer" };
    function swatchStyle(tint) {
      return { width: "22px", height: "22px", borderRadius: "50%", background: tint, cursor: "pointer", padding: "0",
        border: "1px solid rgba(128,128,128,0.45)" };
    }
    function swatchActiveStyle(tint) {
      return { width: "26px", height: "26px", borderRadius: "50%", background: tint, cursor: "pointer", padding: "0",
        border: "2px solid var(--dsw-alias-brand-primary, #4d6bfe)" };
    }

    /** 插件入口：先保证气泡样式生效，设置页失败也只丢那一页。 */
    function apply(ctx) {
      applySettings(readSettings());
      const tag = injectStyle();
      if (tag !== null && ctx && typeof ctx.effect === "function") {
        ctx.effect(() => () => {
          if (tag.parentNode !== null) tag.parentNode.removeChild(tag);
        });
      }
      try {
        if (!ctx || typeof ctx.inject !== "function") return;
        ctx.inject(["slots", "locale"], (child) => {
          try {
            const localize = typeof child.locale.bind === "function" ? child.locale.bind(LOCALE) : (key) => key;
            child.effect(() => child.locale.register(LOCALE, { en, zh }));
            child.effect(() => child.slots.inject("settings.section", () => child.slots.register({
              name: "settings.section", id: "assistant-bubble", order: 12,
              label: () => localize("nav"), locale: LOCALE
            }, BubbleSection)));
          } catch (error) {}
        });
      } catch (error) {}
    }

    exports.apply = apply;
    return module.exports;
  }
});
