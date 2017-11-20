# `express-scaffold`
基于 `express-generator` 扩展的脚手架

主要新增了如下常用基础设施功能：
* `config` 多环境配置文件，在 `config` 目录下, `default.json` 公共配置文件，`dev.json` 、 `prod.json` 会覆盖 `default.json` 中同名配置
* `log4js` 日志记录
* 自动加载 `routes` 目录下的路由,增加路由映射时，不再需要手动添加 `app.use('\**', router)`
* 集成 `express-session`、 `connect-redis` , 存储 `session` 至 `redis`
* 集成 `mongoose` 连接 `mongodb`, 自动载入 `/models` 目录下 `model`

---

*** 推荐云 `NoSql` 数据库 ***
> 申请账号需要自备梯子，之后连接数据库使用过程不需要

* [redislabs](https://app.redislabs.com)
* [mlab (mongodb)](https://mlab.com)