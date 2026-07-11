# 德讯体彩店宣传网站

社区实体体彩门店的品牌宣传单页网站。纯 HTML + CSS + 原生 JavaScript 制作，无需任何构建工具，可直接双击 `index.html` 本地预览，也可以直接上传到 GitHub Pages 免费发布。

> 本网站仅为「德讯体彩店」实体门店的宣传展示页面，**不是中国体育彩票官方网站**，不提供在线投注、网络售彩、转账代购、远程出票或彩票配送等任何线上服务。

---

## 一、项目结构

```
dexun-store/
├── index.html          网站主页面
├── styles.css           样式文件
├── script.js             交互脚本
├── README.md          说明文档（本文件）
├── .nojekyll             告诉 GitHub Pages 不要用 Jekyll 处理本项目
└── assets/
    ├── shop-front.jpg    门店外观照片（首屏 Hero 大图）
    ├── env-1.jpg           店内环境 · 休息区
    ├── env-2.jpg           店内环境 · 责任彩票公益宣传角
    ├── env-3.jpg           店内环境 · 电视观赛与购彩专柜
    ├── env-4.jpg           店内环境 · 世界杯纪念足球打卡角
    └── video1.mp4        门店日常视频
```

所有资源均使用相对路径引用（例如 `./assets/shop-front.jpg`），不包含任何本地绝对路径，可以直接部署到任意域名或子路径下。

---

## 二、本地预览

不需要安装任何软件，直接双击 `index.html` 用浏览器打开即可预览。

如果本地预览时视频或图片显示异常，也可以用简单的本地服务器打开效果更好（可选，非必须）：

```bash
# 进入项目文件夹后，任选一种方式
python3 -m http.server 8000
# 然后浏览器访问 http://localhost:8000
```

---

## 三、发布到 GitHub Pages（完整步骤）

1. 注册或登录 GitHub 账号：https://github.com
2. 点击右上角「+」→「New repository」，创建一个**公开（Public）**仓库，名称建议为 `dexun-store`
3. 将以下文件和文件夹上传到仓库**根目录**（可以直接在网页上拖拽上传，或用 Git 命令行）：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.nojekyll`
   - `assets/` 文件夹（包含里面的 4 个文件）
4. 打开仓库页面，点击顶部的 **Settings**
5. 左侧菜单点击 **Pages**
6. 在 **Build and deployment** 部分，Source 选择 **Deploy from a branch**
7. **Branch** 选择 `main`
8. **Folder** 选择 `/root`（也就是仓库根目录）
9. 点击 **Save**
10. 等待 1~3 分钟，GitHub 会自动完成发布
11. 发布成功后，网站地址通常是：

```
https://你的用户名.github.io/dexun-store/
```

（把「你的用户名」替换成你自己的 GitHub 用户名）

### 使用 Git 命令行上传（可选）

```bash
cd dexun-store
git init
git add .
git commit -m "初始发布：德讯体彩店宣传网站"
git branch -M main
git remote add origin https://github.com/你的用户名/dexun-store.git
git push -u origin main
```

---

## 四、如何替换图片

1. 准备好新的图片，建议尺寸：
   - `shop-front.jpg`（首屏 Hero 大图，用于沉浸式主视觉）：竖版效果最好，建议不小于 1000×1400 像素
   - `env-1.jpg` ~ `env-4.jpg`（店内环境图）：横版效果更好，建议不小于 1600×1200 像素
2. 用**完全相同的文件名**替换 `assets/` 文件夹里的对应文件（文件名区分大小写，必须严格一致）
3. 重新上传到 GitHub 仓库覆盖旧文件即可，无需修改 `index.html` 或 `styles.css`

如果想使用不同的文件名，需要同步修改 `index.html` 中对应的 `src="./assets/xxx.jpg"` 路径，以及每张图片对应的 `alt` 描述。

---

## 五、如何替换视频

1. 准备好新的视频文件，建议格式为 `.mp4`（H.264 编码，兼容性最好）
2. **建议先压缩视频再上传**，控制在 20MB 以内，避免手机端加载过慢。可以使用免费工具压缩，例如：
   - HandBrake（桌面软件，跨平台）
   - 剪映 / CapCut 导出时选择较低码率
   - 在线压缩工具（注意隐私，尽量选择本地处理的工具）
3. 用**完全相同的文件名**替换 `assets/video1.mp4`
4. 重新上传覆盖即可

---

## 六、如何填写联系电话

打开 `index.html`，搜索文字：

```
联系电话：暂未填写
```

一共出现 1 处（到店信息板块），把它改成实际的电话号码，例如：

```
联系电话：0756-xxxxxxx
```

保存后重新上传到 GitHub 即可生效。

---

## 七、如何修改营业时间

打开 `index.html`，搜索文字：

```
每日 12:00—20:00
```

这段文字在页面中出现了多处（首屏标签、到店信息板块），建议使用编辑器的「查找全部」功能，把所有位置都改成新的营业时间，保持前后一致。

---

## 八、如何修改地址

打开 `index.html`，搜索文字：

```
中国广东省珠海市香洲区香湖路141号
```

以及首屏正文中的：

```
位于珠海市香洲区香湖路141号
```

将其替换为新地址。

同时，「导航到店」按钮和「打开高德地图」按钮使用的是高德地图跳转链接，需要同步更新链接中的地址关键词：

```
https://uri.amap.com/search?keyword=你的新地址（需要进行 URL 编码）
```

生成新链接最简单的方法：打开高德地图网页版或 App，搜索新地址，复制分享出的跳转链接，替换 `index.html` 中所有 `https://uri.amap.com/search?keyword=...` 开头的链接（页面中共出现 3 处：顶部导航按钮、Hero 按钮、到店信息按钮）。

---

## 九、如何更新已发布的网站

修改完文件后，只需要重新上传（覆盖）对应文件到 GitHub 仓库：

- 网页端：直接在仓库页面点击对应文件 →「Edit」或直接拖拽新文件覆盖上传
- 命令行：

```bash
git add .
git commit -m "更新门店信息"
git push
```

GitHub Pages 通常会在 1~2 分钟内自动重新部署，刷新网站即可看到最新内容（如果浏览器有缓存，可尝试强制刷新 `Ctrl/Cmd + Shift + R`）。

---

## 十、注意事项

1. 所有文件名大小写必须与 `index.html`、`styles.css` 中引用的路径完全一致（GitHub Pages 服务器区分大小写）
2. 视频建议压缩后再上传，减少加载时间
3. 仓库必须是 **Public（公开）** 才能使用免费的 GitHub Pages
4. 首次发布后，如果访问 404，请耐心等待几分钟，或检查 Settings → Pages 中的发布状态
5. 网站不包含任何在线投注、支付、会员系统等功能，如需修改文案，请始终保留页面底部的合规声明板块

---

## 十一、技术说明

- 纯 HTML5 + CSS3 + 原生 JavaScript（ES5+），无需 npm、无需构建工具
- 使用 GSAP / ScrollTrigger（通过 CDN 引入）作为渐进增强；即使 CDN 加载失败，页面核心内容和导航功能依然可以正常使用
- 支持 `prefers-reduced-motion`，为有需要的用户自动降低动效
- 已适配 Safari、Chrome 及微信内置浏览器
- 图片使用 `loading="lazy"` 懒加载，首屏图片使用 `fetchpriority="high"` 优先加载
- 视频默认不自动播放、不自动出声，需要用户点击后才播放
