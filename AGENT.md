# seeback-astro 代理手册

## 1. 使命与范围
- 维护并扩展 `starlight-main/examples/seeback-astro`，确保其持续替代旧版 Vue + Spring Boot 前端展示层。
- 与 `src/seeback-docs/ASTRO_PROJECT_SPEC.md`、`ASTRO_MIGRATION_PLAN.md`、`UNDERSTAND.md`、`PROGRESS_LOG.md` 协同使用；当规范或流程调整时同步更新各文档。
- 以增量、可验证的交付为先；未得到明确需求时禁止引入后端耦合或非必要依赖。

## 2. 行为原则
- **KISS**：坚持 Astro 原生简单模式，组件保持轻量，避免无谓抽象。
- **YAGNI**：仅实现当前确认的页面、内容与接口；例如后台管理等可选能力需待需求明确再处理。
- **DRY**：导航、社交链接、通用布局集中在 `MainLayout.astro`；在新增变体前优先复用 `PageHeader`、`PostList`、`FriendList` 等组件。
- **SOLID**：
  - 单一职责：每个组件专注一项功能。
  - 开闭原则：通过 props 或配置扩展行为，减少直接修改核心逻辑。
  - 里氏替换：派生组件或新实现必须与既有用法兼容。
  - 接口隔离：暴露精炼接口，避免“胖组件”。
  - 依赖倒置：依赖内容集合、工具函数等抽象层，而非具体数据源。

## 3. 项目地图
- `src/pages/`：路由入口；仅保留薄逻辑，统一采用 `<MainLayout>` + `<PageHeader>` 结构。
- `src/layouts/MainLayout.astro`：导航与社交链接配置中心；所有导航调整在此维护。
- `src/components/`：复用 UI（PageHeader、PostList、FriendList、SocialLinks 等）；命名遵循 PascalCase。
- `src/content/`：Astro Content Collections；Markdown 与 JSON 受 `content/config.ts` schema 管理。
- `public/`：静态资源根目录，引用以 `/` 开头。
- `src/styles/`：全局与组件级样式，配色继承旧站灰白 + 低饱和蓝紫体系。

## 4. 交付作业流程
- 迁移或新增模块遵循 `ASTRO_MIGRATION_PLAN.md` 各阶段：环境准备 → 布局骨架 → 内容与路由 → 资源整理 → 数据策略 → 构建测试 → 部署交付。
- 迁移旧视图时对照计划附录完成路径映射，确保 Astro 路由与原 URL 对齐。
- 保持布局调整与内容迁移解耦；阶段完成后在 `PROGRESS_LOG.md` 记录日期与范围。

## 5. 内容与数据规范
- 全部文章与结构化数据写入 Content Collections；新增字段前先在 `content/config.ts` 声明 schema。
- Markdown frontmatter 必含 `title`、`date`（ISO 字符串），可选 `excerpt`、`tags[]`。
- 友链数据存放于 `src/content/friends/friends.json`，页面内禁止硬编码。
- 任意内容更新后运行 `pnpm astro check` 验证 schema。

## 6. UI 与体验守则
- 导航/侧边栏需在宽度 < 992px 时折叠为顶部导航，并保持内容区 16px 内边距。
- 符号化图标（Unicode）遵循 `UNDERSTAND.md` 设定，通过 nav/social `icon` 字段扩展。
- 所有图片必须提供 `alt`，外链补充 `rel="noopener noreferrer"`；异步数据需准备兜底状态。
- 基础样式源自 `src/styles/base.css`，组件内按需使用局部 `<style>`。

## 7. 工具链与工作流
- 包管理工具优先使用 pnpm，遵循项目既定方案，严禁混用其他安装器。
- 核心脚本：`pnpm dev`（本地开发）、`pnpm astro check`、`pnpm lint`（如已配置）、`pnpm build`、`pnpm preview`。
- API 调用集中于 `src/utils/api.ts`；基地址通过 `import.meta.env.PUBLIC_API_BASE` 获取，并维护 `.env.example`。
- 如需与 Spring Boot 混合模式协作，先在文档中登记接口、降级策略与安全约束。

## 8. 质量门槛
- 构建警告视为阻断项；提交前确保 `pnpm astro check` 与 `pnpm build` 均通过。
- 新增逻辑需要手工或自动化冒烟验证，在任务记录或 PR 描述中注明验证步骤。
- 完成前执行无障碍（键盘导航、语义标题）与性能（资源体积）审查。

## 9. 文档与协作
- 结构或规范调整需同步更新 `ASTRO_PROJECT_SPEC.md`；功能里程碑在 `PROGRESS_LOG.md` 标注日期与范围。
- 架构理解、组件职责等补充说明写入 `UNDERSTAND.md` 以便共享知识。
- 新成员入场时引用本手册；若流程或工具变动请及时修订。

_最后更新：2025-10-03（与 `UNDERSTAND.md` v1.2 符号图标规范保持一致）_
