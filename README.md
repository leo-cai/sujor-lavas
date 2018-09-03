# sujor-lavas

> 这是一个 Lavas PWA 项目

## npm 相关命令

``` bash
# 安装工程依赖
npm install

# 在本地启动调试 server
npm run dev

# 构建线上生产环境产物
npm run build

# 启动编译后的代码，注意，需要在 dist 目录中启动，仅 SSR 模式下有效
npm run start

# 检查代码是否符合规范
npm run lint

# git push 服务器自动 pull 并部署
首次推送项目（从 git 到 服务器） pm2 deploy ecosystem.json production setup
之后的项目更新重启服务(spa) pm2 deploy ecosystem.json production
之后的项目更新重启服务(ssr) pm2 deploy ecosystem-ssr.json production
```

Lavas 工程模版基于 [vue-template-vue](https://github.com/lavas-project/lavas-template-vue/) 模版的 `release-*` 分支创建。
如果想要了解具体如何玩转整个 Lavas 创建的 PWA 工程, 请查看[Lavas 官网教程](https://lavas.baidu.com/guide)。

## Changelog

详细的 Changelog 请看 [Release Notes](https://github.com/lavas-project/lavas-template-vue/releases)
