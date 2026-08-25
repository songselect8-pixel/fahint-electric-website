# Fahint 大图首页前半段设计说明

## 目标

将新交付包首页截图中从首屏到 OEM/ODM 流程的七个连续版块移植到现有 Vite 网站，替换旧首页前半段，同时保留现有站点的导航、独立悬浮按钮、证书、项目 CTA、博客、FAQ、完整询盘表单和页脚。

## 视觉依据

- 唯一视觉目标：`C:/Users/XuWanPi/AppData/Local/Temp/codex-clipboard-b1138211-4e18-4929-b14a-3f0985588216.png`
- 对应可复用实现和原始素材：`D:/国际站运营平台/方特插座/网站资料/fahint-electric-next`
- 不重新发明视觉语言，不生成替代图片；使用交付包中的真实大图素材。

## 首页结构

1. 全屏深蓝品牌首屏：`Safer Power. Smarter Control.`
2. 四项实力数据条：UL/cUL、检测、厂房、OEM/ODM。
3. 六大产品系统大图矩阵。
4. GFCI 核心技术场景大图。
5. 四个应用场景拼贴。
6. 工厂质量控制大图。
7. OEM/ODM 四步流程。
8. 从现有 `HomeCertifications` 开始恢复旧首页后半段。

## 技术边界

- 新增 `EditorialHomepageFront.jsx`，集中管理前半段结构和展示数据。
- 所有新样式使用 `editorial-` 前缀，避免污染旧站其他页面。
- 图片复制到 `public/assets/images/editorial-home/`，不覆盖现有图片。
- 首页仍由 React Router 管理；产品和询盘按钮链接到现有路由。
- 维持桌面双列大图矩阵、平板折叠布局和手机单列布局。

## 验收标准

- 首页能看到七个指定新版版块，顺序与截图一致。
- 六个产品系统全部显示。
- 证书、博客、FAQ、完整询盘表单仍位于新版版块之后。
- 右侧三个悬浮按钮继续独立显示。
- `npm test` 与 `npm run build` 通过。
- 桌面与手机尺寸无横向溢出、文字截断或图片区块塌陷。
