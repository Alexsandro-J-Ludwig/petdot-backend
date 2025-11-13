import winston from "winston";

class Logger {
    logger: winston.Logger;

    public constructor() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' })
              ]
        });
    }

    logInfo(message: string) {
        this.logger.info(message);
    }

    logError(message: string) {
        this.logger.error(message);
    }
}

export { Logger };