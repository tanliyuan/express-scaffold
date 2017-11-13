# `express-scaffold`
基于 `express-generator` 扩展的脚手架

主要新增特性如下：
* 多环境配置文件，在 `config` 目录下, `default.json` 公共配置文件，`dev.json` 、 `prod.json` 会覆盖 `default.json` 中同名配置
* `log4js` 日志记录
* 自动加载 `routes` 目录下的路由,增加路由映射时，不再需要手动添加 `app.use('\**', router)`
* `session` 存储在 `mongodb`
