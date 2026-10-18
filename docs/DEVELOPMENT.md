# 开发说明

## 结构

| 文件 | 作用 |
| --- | --- |
| `package.json` | `dsh.bundle.patch`（bundle 声明）+ `dsh.client`（浏览器半区声明） |
| `cordis.patch.yml` | 向 profile 注册一行 host 条目 |
| `lib/index.js` | host 半区：空 `apply()`，本插件不需要宿主侧逻辑 |
| `lib/client.js` | 全部实现：一张样式表 + 设置分区页（React）+ CSS 变量写入 |

## 设计取舍

1. **参数一律走 CSS 变量，值内联写到 `body`**：深浅主题可以用 `body[data-ds-dark-theme]` 覆盖变量、
   玻璃挡还能用 `body[data-dab-glass]` 做门控，一套规则吃两套参数，改一处全局生效。
2. **门控属性与参数都挂在 `body` 上**：只有同层才能写出 `body[data-ds-dark-theme][data-dab-glass]` 这种复合选择器。
3. **设置值存 `localStorage`**（而不是写进 profile 配置）：要让值进入宿主设置表单，host 半区必须
   `import "@deepseek-ai/schemastery"` 声明 `.volatile()` 字段；而第三方 `link:` 包的真实路径在维护目录下，
   Node 从那里解析裸模块说明符找不到官方包（profile 用 `nodeLinker: hoisted` + `autoInstallPeers: false`，
   官方包以 peer 形式存在但安装时被跳过，实测 `ERR_MODULE_NOT_FOUND`）。
   想改成写进 profile 有三条路，各有代价：① 从 asar `createRequire` 取宿主同款 schemastery（依赖安装路径）；
   ② 包自带依赖并改用 `file:` 安装（失去"改源码即生效"）；③ 源码放进 profile 的 `node_modules`。
4. **客户端半区不声明 `dsh.client.inject`**：模块无条件加载 ⇒ 气泡样式一定生效；
   `slots` / `locale` 用 `ctx.inject` 运行时等待，拿不到只丢设置页，不影响样式。
5. **不做 `localStorage` 写入防抖**：一次写入几百字节、开销在微秒级；防抖反而引入"最后一次改动可能丢"的状态机。
6. **宽表格的取舍**：宿主的宽表格按滚动容器整屏出血，与气泡宽度无关。要"气泡包住内容"，只能把表格收回气泡内横滚；
   若更想保留出血观感，则气泡也得整列宽（所有消息通栏）。本项目选了前者。

## 踩过的坑

| 症状 | 根因 |
| --- | --- |
| 雾化滑块完全没效果 | 基础挡的 `backdrop-filter: none !important` 压掉了玻璃挡里**没带** `!important` 的 `blur()` |
| 气泡套了两层 | 兜底选择器 `div[class*="markdown"]` 命中了另一个元素（宿主并没有这种类名，纯属误伤） |
| 气泡里的图标偏下 | 气泡挂在 `[data-turn-tail]` 容器上，而它是 `flex column + gap:16px` 且带一个默认空的 tail 插槽 —— 图标行被间隙推下去 |
| 工具条气泡通栏 | `.actions` 是**块级** flex 容器，宽度默认撑满 |
| 上下文环没被覆盖 | 宿主里 CSS-Module 键叫 `trigger` 的组件有 12 个，宽泛选择器会误伤 ⇒ 改用它的 `svg[viewBox="0 0 14 14"]` 特征锁定 |
| 表格戳出气泡 | `.md-table-wide` 的宽度按 `100cqw`（滚动容器）算，与气泡无关 |
| 改 CSS 改出结构错乱 | 在 JS 字符串层做替换：CSS 常量里的换行是转义形式，且"一组并列选择器"的最后一行以 `{` 结尾容易漏 ⇒ **改 CSS 一律在 CSS 文本层做，或整段重写** |

## 验证方式

没有测试框架，验证靠沙箱里的**迷你 React 引擎 + 假 DOM**：真实渲染设置页、模拟点击与拖动、
检查 `body` 上的门控属性、CSS 变量、`localStorage` 写入。覆盖过的边界：

- 脏存储（越界夹紧、`null` / 类型错回退默认、非法 JSON、3 位 hex 归一化）；
- `document.body` 缺失、样式标签复用、`locale` 抛错、`ctx.inject` 缺失、官方 `Switch` 缺失时的降级；
  （`ctx.inject` 缺失时仍出样式、只是没有设置页）
- 取色器非法输入被忽略、卸载时样式表被摘除。

CSS 部分靠读宿主 `app.asar` 里的源码核对锚点与层叠特异性（选择器写错时最坏是"样式静默失效"，不会有副作用）。

## 版本要点

| 版本 | 关键变化 |
| --- | --- |
| v1 | 最小实现：一张样式表，给助手正文加不透明底 |
| v2 | 透明度抽成 CSS 变量；设置页挂在「设置 → 通用」 |
| v3 | 删掉误伤的兜底选择器（单层气泡） |
| v4 | 独立分区「助手回复气泡」+ 一组滑块；液态玻璃开关 |
| v5 | 修 `backdrop-filter` 被 `!important` 压制（雾化无效） |
| v7 | 代码审查：`readNumber` 的 `null` 处理、单位魔数、颜色归一化、无障碍媒体查询、降级兜底 |
| v8 | 新增「白釉强度」 |
| v9–v12 | 周边行同步：工具条 / 过程行 / 分组头 / 触发条 / 统计行 / 上下文环 / 运行行 |
| v14–v15 | 工具条气泡改挂图标行（居中）、收成内容宽度 |
| v16 | 宽表格收进气泡 |
| v18 | 默认值固化为作者的一套参数 |

## 更新记录

### 1.3.0

- **新增：非会话页面铺底**。开皮肤后「插件」「自动化任务」「技能中心」「上下文洞察」等独立页面的文字会糊在壁纸上，
  现在用**一条通用规则**处理：
  ```css
  body[data-dab-page] [class*="_centerCol"] [data-slot]:not([data-slot*="conversation"]) > * {
    background: rgba(var(--dab-solid-color), var(--dab-page-alpha, 0.6)) !important;
  }
  ```
  要求：页面根挂在中间列（`*_centerCol`）内、`[data-slot]` 包裹层之下；会话里的消息也包在 `[data-slot]` 里
  （`conversation.chat.node`），所以必须按 slot 名排除 —— 否则整个聊天区都会被铺底（踩过这个坑）。
- **新增设置项**：可折叠分组「非会话页面底色」，折叠态一行（标题 + 开/关 · 浓度 + 右侧三角），
  展开后是开关与浓度滑块；数据存在 `settings.page = { enabled, alpha }`，浓度用独立变量 `--dab-page-alpha`。
- 一些结构性经验：
  | 坑 | 结论 |
  | --- | --- |
  | 用 `[class*="_page"]` 匹配页面根 | 会把 `_pageTitle`/`_pageHead` 一起命中 ⇒ 文字周围出现白方框；改用 `[class$="_page"]`（后缀精确） |
  | 只按 `[data-slot] > *` 选 | 会话消息节点也在 slot 里 ⇒ 必须 `:not([data-slot*="conversation"])` |
  | 第三方页面（技能中心） | 类名是 CSS-Module 哈希（`ptK59a_view`），升级会变；dsh-context 是手写 kebab（`lc-ov-page`），更稳 |
  | 会话区里没有 `[data-conversation-scroll]` | 不能用它来识别会话，改用 slot 名 |

### 1.2.1

- 修「过程分组头」（"已完成分析"）与它下面那一行之间的 0 间距：原先用相邻兄弟选择器
  （`A + B`）补缝，但分组头、过程行、思考行**并不同父**（思考行在助手正文容器内），
  该规则从未匹配 ⇒ 改为直接给分组头加 `margin-bottom: 3px`，下面接什么行都管用。

### 1.2.0

- **新增覆盖面**：「工作步骤展示」里的**工具调用行**（宿主锚点 `div[data-tool]`）与**「思考」行**
  （`[data-variant="think"]`）—— 两者的标题行都是宿主的 `DisclosureRow`，所以共用一组规则；
  **折叠态**收成内容宽度（小胶囊），**展开态**保持宿主宽度（大横条）；
- **画法约束（踩过的坑）**：这类行的宿主高度是**固定值**（思考行甚至是 `contain: size layout`），
  所以只能用**不参与布局**的属性做装饰 —— `background` / `border-radius` / `box-shadow: inset …`；
  用 `padding`（垂直）或 `border` 会让内容**溢出父级**、与相邻行重叠。这条对任何"固定高度的宿主行"都适用；
- **无障碍**：`prefers-reduced-transparency` 的媒体查询合并为一处，并补齐明细行（此前只覆盖气泡与周边行）；
- **JS** 现在同时写 `--dab-solid-color`（此前实心挡的颜色从不跟随「玻璃颜色」设置）；
- 清理：CSS 里 v55~v58 重写时残留的重复注释（同一处并存 2~3 份互相矛盾的注释）；
  注：`body[data-ds-dark-theme]` 里的颜色变量实际总被 JS 内联值覆盖（内联 > 样式表，变量无法用 `!important`），
  保留它只是兜底；深浅色真正的来源是「深色单独设置」开关。

### 1.1.0

- **助手正文气泡**加了一条判据：容器里必须真的含有块级正文元素（`p` / `pre` / `ul` / `ol` / `table` /
  `blockquote` / `h1–h6` / `figure`）才绘制 —— 生成过程中"容器已在、内容还没来"的空壳不再画出一块空白；
- **周边行胶囊**：垂直内边距 3px、相邻之间 `margin: 3px 0`。宿主这些行原生是**零间距**
  （没有盒子边界所以看不出来），一旦加气泡就会贴住，必须靠外边距留缝；
- **思考面板的粘性标题行**：宿主实心底色 → 同色半透明（`color-mix(... 80%, transparent)`），
  保留吸顶、去掉黑带；刻意不用 `backdrop-filter`（会把下方浅色文字糊成白带）。
