# Astro 迁移执行步骤

目标：将 `/home/seeback/learingProject/seeback/blog/seebackのblog` 中的 Vue + Spring Boot 前端展示部分迁移到 Astro 示例项目 `starlight-main/examples/seeback-astro`。

## 阶段 0：准备环境
1. 进入 `starlight-main` 根目录：`cd /home/seeback/learingProject/seeback/blog/starlight-main`。
2. 安装依赖管理工具（推荐 `pnpm`）：`npm install -g pnpm`（如已安装可跳过）。
3. 在 `examples` 下创建新的 Astro 项目骨架：
   ```bash
   pnpm create astro -- --template basics examples/seeback-astro
   cd examples/seeback-astro
   pnpm install
   ```
4. 清理模板多余页面，仅保留 `src/pages/index.astro` 作为占位；删除示例文档文件。

## 阶段 1：迁移全局框架
1. 在 `src/layouts/` 新建 `MainLayout.astro`，复制 `seebackのblog/src/layouts/BasicLayout.vue` 的结构与样式并适配 Astro（参照 `ASTRO_PROJECT_SPEC.md` 中的布局示例）。
2. 将 `src/pages/index.astro` 改写为：
   ```astro
   ---
   import MainLayout from '../layouts/MainLayout.astro';
   ---
   <MainLayout>
     <h1>seeback の blog</h1>
     <p>这里是迁移后的 Astro 站点首页。</p>
   </MainLayout>
   ```
3. 补充 `src/styles/base.css`（可从原项目抽取基础样式），并在 `src/layouts/MainLayout.astro` 中通过 `<link rel="stylesheet" href="/styles/base.css" />` 引入。
4. 配置 `astro.config.mjs`：
   ```js
   import { defineConfig } from 'astro/config';
   export default defineConfig({ site: 'https://seeback.dev' /* 替换为实际域名 */ });
   ```

## 阶段 2：内容与路由
1. 建立 Content Collections：
   - 创建 `src/content/config.ts`，定义 `posts` 集合（字段包含 `title`、`date`、`excerpt`、`tags`）。
   - 将原 Vue 项目 Markdown/富文本内容转为 `.md` 文件放入 `src/content/posts/`。
2. 迁移页面：
   - `src/pages/blog/index.astro`：遍历 `posts` 集合生成文章列表。
   - `src/pages/blog/[slug].astro`：渲染单篇文章（参照文档示例）。
   - `src/pages/about.astro`：复制 `seebackのblog/src/pages/AboutPage.vue` 中的文本，重写为 Astro+CSS。
   - `src/pages/link-friend.astro`：保持原空模板，未来从 `src/content/friends/friends.json` 中读取友链。
   - `src/pages/changelog.astro`：迁移更新记录（如有）。
3. 首页根据需要展示精选文章或最新动态，可直接读取 `posts` 并显示前 N 条。
4. 若保留管理员后台，则保持 `/admin` 路由指向旧系统，不在 Astro 站内实现。

## 阶段 3：资源迁移
1. 将 `seebackのblog/public` 中的静态资源复制到 `seeback-astro/public`，注意去除仅后端使用的文件。
2. 更新所有图片引用路径为 `/images/...`（Astro 会从 `public/` 根目录提供）。
3. 若原站点使用图标字体或外部脚本，检查是否仍需加载，尽量改用 Astro 内置 `<Image />` 或 SVG。

## 阶段 4：数据交互策略
- **纯静态**：文章完全使用 Markdown；评论、点赞等功能可接入第三方服务（Giscus、Waline），无需 Spring Boot。
- **混合模式**：
  1. 保留 Spring Boot 服务并开放 REST API。
  2. 在 Astro 中创建 `src/utils/api.ts`，封装 `fetch(import.meta.env.PUBLIC_API_BASE + '/blog/list')`。
  3. 在页面中导入工具函数，通过 `await` 获取数据并渲染。
  4. `.env` 文件存储 API 基地址，提交代码前创建 `.env.example`。

## 阶段 5：构建与测试
1. 本地运行 `pnpm dev`，逐页检查布局、导航、响应式表现。
2. 运行 `pnpm astro check` 验证 schema 与类型。
3. 构建产物：`pnpm build` → 输出 `dist/`。
4. 如需预览生产版本：`pnpm preview`。

## 阶段 6：部署
1. 选择部署平台：Vercel / Netlify / Cloudflare Pages / 自有服务器。
2. 配置构建命令：`pnpm build`，产物目录：`dist`。
3. 若保留 Spring Boot，需要：
   - 在同域或子域部署后端；
   - 配置反向代理或 CORS；
   - 更新 `.env` 中的 `PUBLIC_API_BASE`。
4. 部署完成后，验证：主页、文章详情、RSS 链接、关于页、友链页。

## 阶段 7：收尾与文档
1. 更新 `seeback-docs/ASTRO_PROJECT_SPEC.md` 与当前文件，记录新的目录或流程调整。
2. 在仓库根目录添加 `README.md`，说明：
   - 项目简介
   - 开发命令
   - 内容管理方式
   - 部署方式
3. 若旧系统需要与新站并行，保留切换链接，并在文档注明访问方式。

## 附录：对照表
| Vue + Spring Boot 路径 | Astro 目标路径 | 说明 |
|-------------------------|-----------------|------|
| `src/pages/HomePage.vue` | `src/pages/index.astro` | 首页替换为 Astro 页面 |
| `src/pages/blog/BlogListPage.vue` | `src/pages/blog/index.astro` | 文章列表 |
| `src/pages/blog/BlogDetailPage.vue` | `src/pages/blog/[slug].astro` | 文章详情 |
| `src/pages/AboutPage.vue` | `src/pages/about.astro` | About 页面 |
| `src/pages/LinkFriendPage.vue` | `src/pages/link-friend.astro` | 友链页面 |
| `public/` | `public/` | 静态资源直接拷贝 |
| `src/assets/` | `src/styles/` / `public/` | 样式与图像分类归档 |

执行过程中如遇结构调整或新增依赖，请同步更新本文件，确保后续迭代成员可重复迁移流程。
