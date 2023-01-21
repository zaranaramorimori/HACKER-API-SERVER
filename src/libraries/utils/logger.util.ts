import { LoggerService as LoggerServiceInterface } from "@nestjs/common";
import { utilities } from "nest-winston";
import * as winston from "winston";
import { DateUtil } from "./date.util";

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class LoggerUtil implements LoggerServiceInterface {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: "isoDateTime" }),
        ms(),
        prettyPrint()
      ),
      transports: [
        new winston.transports.File({
          level: "error",
          filename: `error-${DateUtil.toLocalDate(new Date()).toString()}.log`,
          dirname: "logs",
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: process.env.NODE_ENV === "production" ? "info" : "debug",
          format: combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.align(),
            utilities.format.nestLike(`Hacker_${process.env.NODE_ENV}`, {
              prettyPrint: true,
            })
          ),
        }),
        new winston.transports.File({
          level: "log" || "info" || "debug" || "verbose",
          filename: `application-${DateUtil.toLocalDate(
            new Date()
          ).toString()}.log`,
          dirname: "logs",
          maxsize: 5000000,
        }),
      ],
    });

    console.log = (message: any, params?: any) => {
      this.logger.debug(message, params);
    };
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
