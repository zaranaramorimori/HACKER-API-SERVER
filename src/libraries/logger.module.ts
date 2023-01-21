import { Logger, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggerInterceptor } from "./interceptors/logger.interceptor";

@Module({
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class LoggerModule {}
