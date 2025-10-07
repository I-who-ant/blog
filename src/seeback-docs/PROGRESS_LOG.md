# Astro 迁移进度记录

## 阶段一（初始化骨架）
- 日期：2024-05-09
- 内容：
  - 在 `starlight-main/examples` 下创建 `seeback-astro` 项目目录。
  - 新建基础配置：`package.json`、`astro.config.mjs`、`tsconfig.json`。
  - 建立 `src/pages/index.astro` 占位页面，确认 Astro 站点结构启动。
- 说明：此阶段仅完成骨架搭建，尚未迁移任何布局或样式，后续将在此基础上引入 `MainLayout` 与内容体系。

## 阶段二（布局与页面框架）
- 日期：2024-05-09
- 内容：
  - 创建 `src/layouts/MainLayout.astro`，将 Vue 版本的侧边栏、社交链接、全局页脚迁移到 Astro。
  - 新增基础样式文件 `src/styles/base.css`，统一区域配色与响应式规则。
  - 初始化关键页面入口：`index.astro`、`blog/index.astro`、`blog/[slug].astro`、`about.astro`、`link-friend.astro`、`changelog.astro`，并全部接入 `MainLayout`。
- 说明：目前页面为占位内容，仅保证路由与框架结构一致。下一阶段将迁移 Markdown 数据与真实文案。

## 阶段三（内容体系迁移）
- 日期：2024-05-09
- 内容：
  - 新建 `src/content/` 目录与 `content.config.ts`，定义 `posts`（Markdown）与 `friends`（数据）集合。
  - 将示例文章迁移为 Markdown 文件，首页、列表、详情页面通过集合动态渲染。
  - 友链页面读取 `friends.json`，About、Changelog 页面填入真实文案。
- 说明：已完成内容层迁移，下一阶段将集中在构建验证、RSS 等配套能力。

## 阶段四（构建验证）
- 日期：2024-05-09
- 内容：
  - 调整 Markdown frontmatter：将日期字段统一使用字符串形式，以满足集合 schema。
  - 为 `blog/[slug].astro` 补充 `getStaticPaths` 并改用集合中返回的数据，解决静态构建需求。
  - 运行 `npm run build`，成功生成静态产物（共 7 个页面）。
- 说明：构建流程已打通，后续可在本地 `npm run dev` 开发、`npm run build` 产出部署文件。

## 阶段五（内容生产自动化）
- 日期：2025-10-03
- 内容：
  - 为 Typora 插件 `article_uploader` 新增 `AstroUploader`，直接将当前 Markdown 写入 `src/content/posts`，自动生成符合集合 schema 的 frontmatter。
  - 扩展插件配置、热键与多语言文案，支持自定义仓库路径、文件命名模板以及可选 Git 命令，用于一键保存或推送。
  - 优化 `uploadUtils`，优先解析 Typora 文档中的 YAML frontmatter，将 `title`、`date`、`tags` 等元数据回写至 Astro 文件。
  - 更新插件 README，记录 Astro 集成使用方法；脚本 `install_linux.sh` 无需调整。
  - 调整博客详情页：新增右侧目录（IntersectionObserver 高亮当前标题）、重制代码块配色与阴影，统一文章排版间距，并在 `astro.config.mjs` 中启用 Shiki 双主题与自动换行，避免代码块溢出。
  - Typora 插件上传时自动复制本地图片到 `public/uploads/YYYY/MM/`，同步替换 Markdown 链接并在 Git 提交流程中一并纳入。
  - 新增 `src/pages/rss.xml.js`，借助 `@astrojs/rss` 输出文章 RSS 订阅。
- 说明：完成 Typora → Astro 的无缝写作链路，后续写作可在 Typora 端一键同步到本地仓库，再视需要执行构建或推送。操作步骤如下：
  1. 关闭 Typora，进入插件仓库根目录 `typora_plugin/plugin/bin`，执行 `sudo ./install_linux.sh`（脚本已覆盖权限调整与 `window.html` 注入，无需额外修改）。
  2. 若首次安装，复制 `plugin/global/settings/settings.default.toml` 为 `settings.user.toml`，确保 `[article_uploader]` 区段启用插件并在右键菜单加入 `article_uploader.upload_to_astro`。
  3. 在 `settings.user.toml` 中配置：`repo_root="/home/<user>/.../starlight-main/examples/seeback-astro"`、`posts_dir="src/content/posts"`、`filename_pattern="{date}-{slug}.md"`、`auto_commit` 与 `git_cmd`（可选，例如 `git add {filename}` 或 `git add . && git commit -m "publish: {filename}"`）。
  4. Typora 新建或编辑 Markdown 时可书写 YAML frontmatter；保存后右键选择“上传到 Astro”或按配置的热键，插件会写入目标仓库，必要时手动运行 `pnpm astro check`/`pnpm build` 并推送。
