const winston = require("winston");
const { format, transports } = winston;
const morgan = require('morgan')

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message, meta }) => {
    return `${timestamp} :: [${level.toUpperCase()}] :: ${message} ${meta ? JSON.stringify(meta) : ""}`;
});

const logger = winston.createLogger({
    level: "info", // Log levels: error, warn, info, http, verbose, debug, silly
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat,
        winston.format.colorize(), // Enable colors for console output
    ),
    transports: [
        new transports.Console(), // Logs to console
        new transports.File({ filename: "logs/error.log", level: "error" }), // Error logs
        new transports.File({ filename: "logs/combined.log" }), // All logs
    ],
});


// Morgan for HTTP Request Logging (with Winston)
const httpLogger = morgan(
    ":method :url :status :response-time ms - :res[content-length]",
    {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    }
);

module.exports = { logger, httpLogger };