import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppConfig } from "./app.config";
import { AppModule } from "./app.module";
import { LoggerUtil } from "./libraries/utils/logger.util";

async function bootstrap() {
  const nestExpressServer = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger: new LoggerUtil(),
    }
  );

  const app = new AppConfig(nestExpressServer);
  await app.bootstrap();
  app.startLog();
}

bootstrap().catch(error => {
  new Logger("initial").error(error);
});
