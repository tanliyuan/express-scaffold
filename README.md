# `express-scaffold`

**`DEMO` 地址：** https://node.tanliyuan.top

---

## `DEMO` 环境概况

+ [阿里云免费 `ECS` 1G 1核](https://promotion.aliyun.com/ntms/act/ambassador/sharetouser.html?userCode=3zijnb8k&utm_source=3zijnb8k) (未使用过阿里云产品的用户可以点击链接免费领取)
+ 阿里云免费 `https` 证书
+ `nginx` 域名转发
    > 其他域名站点：  
    > > + https://www.tanliyuan.top (博客)
    > > +  https://react.tanliyuan.top (react后台管理系统)
    > > + https://jenkins.tanliyuan.top (用于发布博客、react、node等子站点)
+ 360网站卫士免费 `CDN` 加速、心跳监测、安全防护
+ 国外免费的 `NoSQL` 云数据库, 下文有申请链接

---

## 基于 `express-generator` 扩展的脚手架

主要新增了如下常用基础设施功能：
* `config` 多环境配置文件，在 `config` 目录下, `default.json` 公共配置文件，`dev.json` 、 `prod.json` 会覆盖 `default.json` 中同名配置

* 引入 `swagger-ui` 和 `swagger-jsdoc`, 可以通过 `jsDoc` 注解生成 `api` 文档, `swagger-ui` 访问路径 https://node.tanliyuan.top/api/, `json` 格式路径  https://node.tanliyuan.top/api/api-docs.json

* 引入基于 `redis` 持久化的 `api` 访问限流, 暂时演示所有链接每个IP每分钟只能访问 4 次

* 集成 `acl` 库权限控制，初始 `mongodb` 数据在 `db\acl_resources.json`, 暂时演示仅在 `\user\save` 加了权限控制

* 增加 `github OAuth2` 登录，授权链接：https://node.tanliyuan.top/oauth/github 

* `mocha` 测试报告

* `log4js` 日志记录

* 自动加载 `routes` 目录下的路由,增加路由映射时，不再需要手动添加 `app.use('\**', router)`

* 集成 `express-session`、 `connect-redis` , 存储 `session` 至 `redis`

* 集成 `mongoose` 连接 `mongodb`, 自动载入 `/models` 目录下 `model`

---

## **推荐两个国外免费云 `NoSql` 数据库**
> ![#1589F0](https://placehold.it/15/1589F0/000000?text=+) 申请账号需要自备梯子，之后连接数据库使用过程不需要

* [redislabs (reids)](https://app.redislabs.com)

    有 `30M` 的免费空间 
    
    通过设置 `RedisStore` 的 `option` `{saveUninitialized: false}`, 只存储登录会话来减少空间占用，用来存储演示项目的 `session` 绰绰有余了. 
* [mlab (mongodb)](https://mlab.com)
    
    有 `500M` 的免费空间

---

## 快速开始

1.  项目根目录下安装依赖包

```javascript
    npm install
```

2.  修改 `config\development.json` 下 `redis`, `mongodb` 连接配置

```javascript
        //mongodb 配置
        "db_url": "mongodb://<username>:<passwd>@127.0.0.1:27017/<dbname>",

        //redis session配置
        "port": 6379,
        "db": 0,
        "pass": "<passwd>",
        "host": "127.0.0.1",
```

3. 可选，如果使用的是 `VSCode` 开发环境, 根据需要修改 `.vscode\launch.json`

```javascript
        {
            "type": "node",
            "request": "launch",
            "name": "dev",
            "program": "${workspaceFolder}\\bin\\www",
            "cwd": "${workspaceFolder}",
            "env": {
                // 会读取 config 目录下 <NODE_ENV>.json 配置文件, 并合并、覆盖 default.json 中同名配置
                "NODE_ENV": "development",
                "DEBUG": "express:*"
                // proxy 开启时，项目中使用client rest 发送请求时, 可用 fiddler 等代理抓包, 方便调试
                // "proxy": "http://localhost:8888"
            }
        }
```

4. 可以通过如下三种方式运行测试用例, 会在项目根目录下生成 `mochawesome-report` 测试报告  

    1. 如果全局安装了 `mocha` , 可以直接在项目根目录下执行

        ```javascript
            mocha
        ```
        `mocha` 默认会执行 `test` 目录下的测试用例，如果 `test` 目录下存在 `mocha.opts` 文件，则会将其内容作为参数, 所以等同于执行如下命令 :

        ```javascript
            mocha --u tdd --colors ./test --reporter mochawesome
        ```

    2. 如果使用的是 `vscode` 开发工具, 可以进入 `debug` 模式，运行 `Mocha Tests` 配置, 具体配置可以查看 `.vscode\launch.json` , 实际运行命令同上

    3. 亦可以根目录下执行 
        ```javascript
            npm test
        ```
> ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) 注意 `2、3` 中实际运行的是 `_mocha` 命令，用的是项目模块安装的 `mocha`, `1` 中使用的是全局安装的 `mocha`, 某些情况下，你的这两个版本可能不一致
5. 启动  http://localhost:3000

```javascript
        npm start
```

  或者 `vscode` 中 `debug` 模式下的 `launch`


---


## 如何使用及自定义修改

---



## 计划中

- [x] 线上 `demo`   ![#00CC00](https://placehold.it/15/00CC00/000000?text=+) `2017-11-24 15:08:32`
- [ ] 统一的异常处理
- [ ] 添加测试用例, 增加 `postman` 文件，方便使用者调试
- [ ] 非登录和登录状态不一样的限流策略


