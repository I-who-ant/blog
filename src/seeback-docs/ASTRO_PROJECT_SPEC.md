# Astro 项目开发规范

适用范围：`starlight-main/examples/seeback-astro` 及后续基于 Astro 的前端展示站点。

## 目录结构
- `src/`
  - `pages/`：页面入口，每个 `.astro` 对应一个路由；仅放置页面级逻辑。
  - `layouts/`：布局组件，统一处理侧边栏、页脚等框架结构。
  - `components/`：可复用 UI 组件；命名采用 PascalCase。
  - `content/`：使用 Astro Content Collections 管理 Markdown 文章、友链等内容。
  - `styles/`：全局或模块化样式文件，默认使用 CSS/Tailwind。
  - `utils/`：工具函数，如接口封装、格式化函数。
- `public/`：静态资源（图片、字体、favicon 等）；引用路径以 `/` 开头。
- `astro.config.mjs`：Astro 配置；禁止将临时脚本写入。
- `package.json`：脚本与依赖声明，使用 pnpm/yarn/npm 三选一，不得混用。

## 命名与代码风格
- 文件命名：页面与组件使用 PascalCase，如 `HomePage.astro`；工具与配置文件使用 camelCase 或 kebab-case。
- 变量命名遵循 camelCase，常量使用全大写加下划线。
- 所有注释、文案、文档统一使用中文。
- 禁止在页面内直接书写大段业务逻辑，需拆分到 `utils/` 或 `services/`。
- 格式化使用 Prettier，保持两空格缩进；在提交前执行 `pnpm lint`（如配置 ESLint）。

## 内容管理
- 文章、友链等信息统一放在 `src/content`，使用集合（collection）定义 schema，确保字段一致。
- Markdown Frontmatter 至少包含 `title`、`date`、`excerpt`；标签使用数组格式。
- 新增文章后需运行 `pnpm astro check` 确保 schema 校验通过。
- 友链可维护在 `src/content/friends/friends.json` 或 Markdown，禁止直接硬编码在页面中。

## 样式与设计
- 基础配色沿用 `seebackのblog` 现有灰白 + 低饱和蓝紫色调；若引入 Tailwind，需在 `tailwind.config.js` 中定义主题色。
- 组件若使用第三方 UI 库，需要在规范中登记并控制体积，避免影响 Astro 首屏。
- 页脚固定在页面底部，内容包含 `about`、`rss`、版权信息、单个 RSS 图标。
- 响应式布局：宽度 < 992px 时侧边栏折叠为顶部导航；内容区域需保持 16px 内边距。

## 数据与后端交互
- 纯静态模式下不得引入未使用的 fetch 调用；若需要实时数据，统一在 `src/utils/api.ts` 中封装 fetch。
- API 基地址通过 `.env` 中的 `PUBLIC_API_BASE` 管理，前端仅引用 `import.meta.env.PUBLIC_API_BASE`。
- 所有异步请求需考虑失败兜底（提示信息或降级内容）。

## 版本控制与提交
- 提交信息遵循 Conventional Commits，例如：`feat: 新增文章详情页`、`style: 调整页脚样式`。
- 提交前执行 `pnpm lint && pnpm astro check && pnpm build`（如 build 成本高，可在 CI 阶段执行）。
- 不得将构建产物 `dist/`、编辑器缓存等提交入库。

## 部署与运维
- 默认构建命令：`pnpm build`，产物位于 `dist/`。
- 部署推荐使用 Vercel/Netlify/Cloudflare Pages；如需自托管，将 `dist` 目录放入任意静态服务器即可。
- 若项目依赖后台 API，需在部署说明中标明依赖地址、鉴权方式及 CORS 设置。

## 安全与可访问性
- 所有外链需加 `rel="noopener noreferrer"`（在 Astro 中通过属性传入）。
- 图片必须添加 `alt` 描述；图标可使用 `aria-label` 提升辅助可读性。
- 保持静态资源体积可控，图片默认执行压缩或使用 Astro 内置 `<Image />`。

## 文档与协作
- 变更结构或新增页面时需同步更新 `seeback-docs/ASTRO_MIGRATION_PLAN.md`。
- 重大 UI 调整需在 PR 中附带截图或录屏。
- 对外发布版本需记录于 `docs/changelog.md`，注明版本号、日期、主要变更。
