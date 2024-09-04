import winston from "winston";
import moment from "moment";
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ strack: true }),
    winston.format.printf((info) => {
      return `[${moment().format("YYYY-MM-DD HH:MM:SS")}] ${info.level} : ${
        info.stack || info.message
      }`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: `../logs/${moment().format("YYYY-MM-DD")}-logs.log`,
    }),
  ]
});

logger.info("This is a first log");
logger.warn("This is a first warning");
logger.error("This is the first error");

export default logger;