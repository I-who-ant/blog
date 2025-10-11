# Astro 迁移进度记录

以下记录 `seeback-astro` 项目（`starlight-main/examples/seeback-astro`）的主要迭代节点，便于回溯变更和快速了解当前状态。

## 阶段一（初始化骨架）
- **日期**：2024-05-09
- **内容**：
  - 在 `starlight-main/examples` 下创建 `seeback-astro` 目录，初始化 `package.json`、`astro.config.mjs`、`tsconfig.json`。
  - 新建 `src/pages/index.astro` 占位页面，验证 Astro 站点能够正常启动。
- **说明**：仅完成骨架搭建，尚未迁移任何布局或内容。

## 阶段二（布局与页面框架）
- **日期**：2024-05-09
- **内容**：
  - 编写 `src/layouts/MainLayout.astro`，迁移 Vue 版本的侧边栏、社交链接、页脚结构。
  - 新增 `src/styles/base.css`，统一深/浅主题配色与响应式规则。
  - 初始化关键页面：`index.astro`、`blog/index.astro`、`blog/[slug].astro`、`about.astro`、`link-friend.astro`、`changelog.astro`，全部接入 `MainLayout`。
- **说明**：此时页面内容为占位文本，仅保证路由与结构正确。

## 阶段三（内容体系迁移）
- **日期**：2024-05-09
- **内容**：
  - 创建 `src/content/` 与 `content.config.ts`，定义 `posts`（Markdown）与 `friends`（JSON）集合。
  - 将示例文章迁移为 Markdown，列表与详情页通过集合动态渲染；友链页面读取 `friends.json`。
  - About、Changelog 等页面填充真实文案。
- **说明**：完成内容层迁移，为后续构建和发布打下基础。

## 阶段四（构建验证）
- **日期**：2024-05-09
- **内容**：
  - 调整 Markdown frontmatter，使 `date` 等字段满足集合 schema 要求。
  - 为 `blog/[slug].astro` 补充 `getStaticPaths`，完全依赖集合数据生成静态路由。
  - 执行 `npm run build`，成功输出 7 个页面的静态产物。
- **说明**：构建流程打通，可通过 `npm run dev` 开发、`npm run build` 产出部署文件。

## 阶段五（内容生产自动化）
- **日期**：2025-10-03
- **内容**：
  - 扩展 Typora 插件 `article_uploader`，新增 `AstroUploader`：可一键将当前 Markdown 写入 `src/content/posts`，自动生成 frontmatter。
  - 插件支持自定义仓库路径、文件命名模板、热键、多语言文案，以及可选 Git 命令（如 `git add`、`git commit`）。
  - 优化上传逻辑，优先解析 Typora 文档中的 YAML frontmatter，将 `title`、`date`、`tags` 等字段回写 Astro 文章。
  - 调整博客详情页：新增右侧目录（IntersectionObserver 高亮当前标题）、重制代码块配色与阴影，统一文章排版；在 `astro.config.mjs` 中启用 Shiki 双主题。
  - 上传时自动复制本地图片到 `public/uploads/YYYY/MM/`，同步替换 Markdown 中的引用路径。
  - 新增 `src/pages/rss.xml.js`，借助 `@astrojs/rss` 输出 RSS 订阅。
- **说明**：Typora → Astro 的写作链路打通，日常写作流程：在 Typora 中编辑 → 使用插件上传 →（可选）执行 `npx astro sync`、`npm run build` → git 提交/推送。

## 阶段六（内容渲染细节优化）
- **日期**：2025-10-10
- **内容**：
  - 将 `posts` 集合的 `date` 字段改为 `z.coerce.date()`，文章列表、详情页和 RSS 均使用 `Date` 对象排序与显示；详情页 `<time>` 补充 `dateTime` 属性并统一 `YYYY-MM-DD` 格式。
  - `src/styles/base.css` 针对 `.content-body` 和 `.article-container` 增强 Markdown 样式：引用自动带主题化左侧边框，代码块强制横向滚动并保持 Shiki 高亮，水平线渲染为 2px 半透明线。
  - 覆盖 Shiki 注入的 `white-space: pre-wrap`，确保长行代码滚动而非换行；Typora 的手动缩进在站点上保持一致。
  - 新增 `markdoc.config.mjs`，启用 Markdoc + Shiki 双主题配置；默认写作仍使用 `.md`，需要增强语法再改为 `.mdx` 或 `.mdoc`。
- **说明**：Markdown 写作体验与线上展示已高度一致，图文、引用、代码块无需额外处理即可保持排版；如需组件/标签扩展，可以随时切换到 `.mdx` / `.mdoc`。
