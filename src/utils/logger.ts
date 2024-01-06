import logger from "pino";
import dayjs from 'dayjs';

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        },
    },
    base: {
        pid: undefined,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log;