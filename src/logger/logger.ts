import { Prisma } from '@/generated/prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, colorize, errors } = winston.format;

const __filename = fileURLToPath(import.meta.url);
const logDir = path.dirname(__filename);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define transports file for combined logs and error logs with daily rotation
const combinedTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '7d',
  format: combine(errors({ stack: true }), timestamp(), json()),
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '7d',
  format: combine(errors({ stack: true }), timestamp(), json()),
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'user-service' },
  transports: [combinedTransport, errorTransport],
});

const consoleFormat = combine(
  timestamp({ format: 'HH:mm:ss' }),
  colorize({ all: true }),
  errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    let msg = `[${timestamp}] ${level}: ${message}`;

    // Clean up metadata: remove 'service' if it's the default one to reduce noise
    const cleanMeta = { ...metadata };
    if (cleanMeta.service === 'user-service') {
      delete cleanMeta.service;
    }

    // If there's any metadata left (like 'body' or 'result'), print it prettified
    if (Object.keys(cleanMeta).length > 0) {
      msg += `\n${JSON.stringify(cleanMeta, null, 2)}`;
    }

    return msg;
  }),
);

// terminal logging for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    }),
  );
}

const prisma_error_instance = [
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientValidationError,
];

export function logError(err: unknown, context: Record<string, unknown> = {}) {
  if (err instanceof Error) {
    if (prisma_error_instance.some((cls) => err instanceof cls)) {
      const maxLength = Number(process.env.MAX_LOG_ERROR_MESSAGE_LENGTH) || 200;
      const truncatedMessage = err.message.slice(0, maxLength);

      logger.error(`Prisma Error Occurred: ${truncatedMessage}...`, {
        name: err.name,
        clientVersion: (err as { clientVersion?: string }).clientVersion,
        ...context,
      });
    } else {
      logger.error(err.message, {
        name: err.name,
        ...context,
      });
    }
  } else {
    logger.error('Unknown error', { error: String(err), ...context });
  }
}
