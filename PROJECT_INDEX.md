# seeback-astro 项目索引

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问: http://localhost:4321 (或 4322 如端口被占用)

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📁 项目结构详解

```
seeback-astro/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── FriendList.astro    # 友链列表组件
│   │   ├── NavMenu.astro       # 导航菜单组件
│   │   ├── PageHeader.astro    # 页面头部组件
│   │   ├── PostList.astro      # 文章列表组件
│   │   ├── SiteFooter.astro    # 站点底部组件
│   │   └── SocialLinks.astro   # 社交链接组件
│   ├── content/             # 内容集合
│   │   ├── config.ts           # Content Collections 配置
│   │   ├── friends/            # 友链数据
│   │   │   └── friends.json
│   │   └── posts/              # 文章内容 (Markdown)
│   │       ├── 2024-design-refresh.md
│   │       └── 2024-hello-astro.md
│   ├── layouts/             # 布局模板
│   │   └── MainLayout.astro    # 主布局模板
│   ├── pages/               # 页面路由
│   │   ├── about.astro         # 关于页面
│   │   ├── blog/               # 博客相关页面
│   │   │   ├── index.astro     # 文章列表页
│   │   │   └── [slug].astro    # 文章详情页 (动态路由)
│   │   ├── changelog.astro     # 更新日志页面
│   │   ├── index.astro         # 首页
│   │   └── link-friend.astro   # 友链页面
│   ├── seeback-docs/        # 项目文档
│   │   ├── ASTRO_MIGRATION_PLAN.md    # 迁移计划
│   │   ├── ASTRO_PROJECT_SPEC.md      # 项目规范
│   │   └── PROGRESS_LOG.md            # 进度日志
│   ├── styles/              # 样式文件
│   │   └── base.css            # 基础样式
│   └── env.d.ts             # TypeScript 环境声明
├── public/                  # 静态资源目录
├── dist/                    # 构建输出目录 (构建后生成)
├── astro.config.mjs         # Astro 配置文件
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript 配置
└── PROJECT_INDEX.md         # 本索引文件
```

## 🧭 导航栏结构

### 主导航 (侧边栏垂直布局)
- **Home** (`/`) - 首页，展示最新文章
- **My life** (`/blog`) - 文章列表页
- **Friends** (`/link-friend`) - 友链页面
- **Changelog** (`/changelog`) - 更新记录

### 社交链接 (侧边栏底部)
- **GitHub** - 代码仓库
- **Email** - 邮箱联系
- **Music** - 网易云音乐

### 底部链接 (页面底部)
- **about** (`/about`) - 关于页面 (不在主导航显示)
- **rss** (`/rss.xml`) - RSS 订阅链接

## 🎨 设计规范

### 色彩主题
- **背景色**: `#fafafa` (浅灰)
- **主文字**: `#1f2937` (深灰)
- **次要文字**: `#6b7280` (中灰)
- **强调色**: `#2563eb` (蓝色)
- **边框色**: `#e5e7eb` (浅灰边框)

### 布局特点
- **侧边栏宽度**: 240px (固定)
- **响应式断点**: 992px (小屏幕折叠为顶部导航)
- **内容区域**: 左边距 240px, 内边距 24px
- **卡片样式**: 圆角 12px, 轻微阴影

### 组件命名
- **页面组件**: PascalCase (如 `HomePage.astro`)
- **工具函数**: camelCase
- **常量**: UPPER_SNAKE_CASE
- **CSS类名**: kebab-case

## 📝 内容管理

### 文章 (Posts Collection)
- **位置**: `src/content/posts/*.md`
- **字段规范**:
  ```yaml
  ---
  title: "文章标题"
  date: "2024-01-01"
  excerpt: "文章摘要" (可选)
  tags: ["标签1", "标签2"] (可选)
  cover: "/images/cover.jpg" (可选)
  ---
  ```

### 友链 (Friends Collection)
- **位置**: `src/content/friends/friends.json`
- **数据格式**:
  ```json
  [
    {
      "name": "朋友名称",
      "url": "https://example.com",
      "description": "网站描述" (可选)
    }
  ]
  ```

## 🔧 开发工作流

1. **添加新文章**: 在 `src/content/posts/` 创建 `.md` 文件
2. **修改样式**: 编辑 `src/styles/base.css`
3. **添加组件**: 在 `src/components/` 创建 `.astro` 文件
4. **新增页面**: 在 `src/pages/` 创建路由文件
5. **更新配置**: 修改 `astro.config.mjs` 或 `src/content/config.ts`

## 🚀 部署指南

### 支持的平台
- **Vercel** (推荐)
- **Netlify**
- **Cloudflare Pages**
- **自托管静态服务器**

### 构建命令
```bash
npm run build
```

### 输出目录
```
dist/
```

### 环境变量 (如需要)
```env
PUBLIC_API_BASE=https://api.example.com
```

## 📚 技术栈

- **框架**: Astro 4.4.0
- **语言**: TypeScript
- **样式**: 原生 CSS
- **内容**: Markdown + Frontmatter
- **包管理**: npm/pnpm/yarn

## 🔗 相关文档

- [Astro 官方文档](https://docs.astro.build/)
- [项目开发规范](./src/seeback-docs/ASTRO_PROJECT_SPEC.md)
- [迁移计划文档](./src/seeback-docs/ASTRO_MIGRATION_PLAN.md)

---

**最后更新**: 2025-10-03
**项目状态**: 开发中
**版本**: v0.0.1