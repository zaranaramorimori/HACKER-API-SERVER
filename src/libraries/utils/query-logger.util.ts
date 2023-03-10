import { utilities } from "nest-winston";
import { Logger, QueryRunner } from "typeorm";
import * as winston from "winston";

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class QueryLoggerUtil implements Logger {
  private _logger: winston.Logger;

  constructor() {
    this._logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: "isoDateTime" }),
        ms(),
        prettyPrint()
      ),
      transports: new winston.transports.Console({
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
    });
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this._logger.log(
      "debug",
      `
      [QUERY] ${query} - ${
        parameters ? JSON.stringify(parameters, null, 2) : ""
      }
      `
    );
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    this._logger.error(
      `[QUERY] ${query} - ${
        parameters ? JSON.stringify(parameters, null, 2) : ""
      }
       [Error] ${error}`
    );
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    this._logger.warn(
      `[QUERY/⏳${time}] ${query} - ${
        parameters ? JSON.stringify(parameters, null, 2) : ""
      }`
    );
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this._logger.log("debug", `[SCHEMA] ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this._logger.log("debug", `[MIGRATION] ${message}`);
  }
  log(level: "log" | "warn" | "info", message: any, queryRunner?: QueryRunner) {
    this._logger.log("debug", `[LOG/${level}] ${message}`);
  }
}
