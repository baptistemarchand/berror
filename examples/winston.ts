import {BError} from "../berror"
import {createLogger, transports} from 'winston'

const logger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console()
    ]
});
  

export class MyError extends BError {
    public log(level: string) {
        if (level === "error") {
            logger.error(this.message, this.metadata)
        } else {
            logger.info(this.message, this.metadata)
        }
    }
}
