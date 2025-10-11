# Astro 项目开发规范

适用范围：`starlight-main/examples/seeback-astro` 项目以及后续基于 Astro 的前端展示站点。

## 目录结构
- `src/`
  - `pages/`：页面入口，每个 `.astro` 对应一个路由；仅放置页面级逻辑。
  - `layouts/`：布局组件，统一处理侧边栏、页脚等框架结构。
  - `components/`：可复用 UI 组件；命名采用 PascalCase。
  - `content/`：Astro Content Collections，管理文章（`posts`）、友链等数据。
  - `styles/`：全局样式文件，目前使用纯 CSS（`src/styles/base.css`）维护主题变量。
- `public/`：静态资源目录，图片、favicon 等；引用路径以 `/` 开头。
- 其他核心文件：`astro.config.mjs`（Astro 配置）、`package.json`（脚本与依赖，项目统一使用 `npm`）。

## 命名与代码风格
- 文件命名：页面与组件使用 PascalCase，如 `HomePage.astro`；工具与配置文件使用 camelCase 或 kebab-case。
- 变量命名遵循 camelCase，常量使用全大写加下划线。
- 所有注释、文案、文档统一使用中文。
- 页面保持轻量逻辑，如需复用请抽到组件或 `utils/`。
- 推荐使用 Prettier（两空格缩进）。如后续接入 ESLint，请在提交前执行 `npm run lint`。

## 内容管理
- 文章、友链等信息统一放在 `src/content`，通过集合（collection）定义 schema。
- Markdown frontmatter 至少包含 `title`、`date`；`date` 写成 ISO 字符串（建议带时区），项目会自动转换为 `Date` 对象并按时间排序。
- 默认写作格式为 `.md`；需要引入 Astro 组件或 Markdoc 标签时，再将文件改为 `.mdx` 或 `.mdoc`。
- 内容更新后执行 `npx astro sync`、`npm run build` 验证 schema 与构建。

## 样式与设计
- 基础配色沿用 `seeback の blog` 现有灰白 + 低饱和蓝紫色调，深浅主题变量统一维护在 `base.css` 中。
- 代码块、引用等排版元素已在全局样式中定义：引用使用左侧边框与背景，代码块托管给 Shiki，高亮随主题切换；切勿在内容中内联重复样式。
- 侧边栏在宽度 < 992px 时折叠为顶部导航；内容区域保持至少 24px 内边距。

## 数据与后端交互
- 目前站点采用纯静态渲染，无后端依赖；若后续需要调用 API，请在 `src/utils/` 中封装，并通过 `import.meta.env.PUBLIC_API_BASE` 等公共变量管理。
- 任何异步请求需处理异常与降级展示，避免白屏。

## 版本控制与提交
- 建议遵循 Conventional Commits，例如 `feat: 新增文章详情页`、`style: 调整全局引用样式`。
- 提交前至少执行 `npm run build` 验证构建，如后续接入 Lint/Check，再补充对应命令。
- 禁止将 `dist/`、`.astro/` 等构建产物及编辑器缓存提交入库。

## 部署与运维
- 构建命令：`npm run build`，产物位于 `dist/`。
- 部署推荐使用 Vercel / Netlify / Cloudflare Pages 等静态托管；自托管时将 `dist/` 上传至 Nginx/Apache 等即可。
- 若引入后台 API，请在部署说明中标明依赖地址、鉴权方式及 CORS 配置。

## 安全与可访问性
- 所有外链需加 `rel="noopener noreferrer"`（在 Astro 中通过属性传入）。
- 图片必须添加 `alt` 描述；图标可使用 `aria-label` 提升辅助可读性。
- 保持静态资源体积可控，图片尽量压缩或使用 Astro 内置 `<Image />` 组件。

## 文档与协作
- 变更结构或新增页面时需同步更新 `seeback-docs/ASTRO_MIGRATION_PLAN.md`、`PROGRESS_LOG.md`。
- 重大 UI 调整需在 PR 中附带截图或录屏。
- 对外发布版本需记录于 `docs/changelog.md` 或仓库 Release，注明版本号、日期、主要变更。
