import pino from 'pino';
import dayjs from 'dayjs';
import pinoHttp from 'pino-http'; 

let levels = {
    info: 55,
    fatal: 60,
    warn: 30,
    error: 35,
    debug: 50
}

export let logger = pino({
    transport: 
     {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    destination: 1,
                    customLevels: 'info:55,fatal:60',
                    customColors: 'info:green,fatal:bgRed',
                    useOnlyCustomLevels: false
                }
            }
        ],
    },
    level: 'info',
    browser: {
        asObject: true
    },
    customLevels: levels,
    useOnlyCustomLevels: true,
    timestamp: () => `, "timestamp":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
});
/**
 * Функция переопределения logger
 * @param lvl 
 * @returns 
 */
export const changeLevel = (lvl: number): number => {
    switch(lvl) {
        case 1: {
            levels = {
                info: 55,
                fatal: 60,
                warn: 30,
                error: 35,
                debug: 50
            } 

            logger = pino({
                transport: {
                    targets: [
                        {
                            target: 'pino-pretty',
                            options: {
                                colorize: true,
                                destination: 1,
                                customLevels: 'info:55,fatal:60',
                                customColors: 'info:green,fatal:bgRed',
                                useOnlyCustomLevels: false
                            }
                        }
                    ],
                },
                level: 'info',
                customLevels: levels,
                useOnlyCustomLevels: true,
                timestamp: () => `, "timestamp":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
            });
            return 0;
        }
        case 2: {
            levels = {
                info: 10,
                fatal: 90,
                warn: 70,
                error: 80,
                debug: 50
            } 
            logger = pino({
                transport: {
                    targets: [
                        {
                            target: 'pino-pretty',
                            options: {
                                colorize: true,
                                destination: 1,
                                customLevels: 'warn:70,error:80,fatal:90',
                                customColors: 'warn:yellow,error:red,fatal:bgRed',
                                useOnlyCustomLevels: false
                            }
                        }
                    ],
                },
                level: 'warn',
                customLevels: levels,
                useOnlyCustomLevels: true,
                timestamp: () => `, "timestamp":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
            });
            return 0;
        }
        case 3: {
            const levels = {
                info: 10,
                fatal: 20,
                warn: 30,
                error: 40,
                debug: 50
            } 
            logger = pino({
                transport: {
                    targets: [
                        {
                            target: 'pino-pretty',
                            options: {
                                colorize: true,
                                destination: 1,
                                customLevels: 'debug:50',
                                customColors: 'debug:cyan',
                                useOnlyCustomLevels: false
                            }
                        }
                    ],
                },
                level: 'debug',
                customLevels: levels,
                useOnlyCustomLevels: true,
                timestamp: () => `, "timestamp":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
            });
            return 0;
        }
        default: {
            return 1;
        }
    }
};

export const loggerHttp = pinoHttp({
    transport: {
        targets: [
            {
                target: 'pino/file',
                options: {
                    destination: `./data/log/${dayjs().format('DD-MM-YYYY')}.log`,
                    mkdir: true,
                }
            },
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    destination: 1,
                }
            }
        ],
    },
    serializers: {
        req(req) {
            return {
                id: req.raw.id,
                method: req.raw.method,
                path: req.url,
                headers: {
                    host: req.raw.headers.host,
                    'content-type': req.raw.headers['content-type']
                },
                body: req.raw.body
            }   
        },
        res(res) {
            if(res.raw.req.baseUrl == '/doc') {
                return {
                    status: res.raw.statusCode
                }    
            }
            return {
                status: res.raw.statusCode,
                body: JSON.parse(res.raw.responseBody)
            }
        }
    }
});