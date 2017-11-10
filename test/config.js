const config = require("config");
const log4j = require("log4js");
log4j.configure('config/log4js.json');
const logger = log4j.getLogger();
const name = config.get("name");
logger.info(config.util.getEnv('NODE_ENV'));
logger.info(process.env.NODE_ENV);
logger.info(name);

let a = 3;
const add = (first=2, second=1) => {
    logger.error(first + second);
};
add();
