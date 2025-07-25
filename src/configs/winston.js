import winston from 'winston';
import expressWinston from 'express-winston';

export default expressWinston.logger({
    transports:[
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.ms(),
        winston.format.combine(),
        winston.format.align()
    ),
    meta: false,
    expressFormat: true,
    metaField: null,
    colorize: true,
    allowFilterOutWhitelistedRequestBody: true,
    ignoreRoute: function (req, res) { return false; }
});


export const cmd = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.ms(),
        winston.format.combine(),
        winston.format.align()
    )
});
