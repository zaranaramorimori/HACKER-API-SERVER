import { ConfigService } from "@configs/enviornment.config";
import { HttpExceptionFilter } from "@libraries/filters/http-exception.filter";
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express/interfaces";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { useContainer } from "class-validator";
import compression from "compression";
import express from "express";
import expressBasicAuth from "express-basic-auth";
import { AppModule } from "./app.module";

export class AppConfig {
  private readonly _NODE_ENV: string;
  private readonly _logger = new Logger(AppConfig.name);

  constructor(private readonly _app: NestExpressApplication) {
    this._NODE_ENV = ConfigService.nodeEnv();
    this._app = _app;
    this._setMiddlewares();
    this._setVersion();
  }

  private _setServerOption<T extends INestApplication>(app: T) {
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
  }

  private _setMiddlewares() {
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(express.json());
    this._app.use(compression());
    this._app.enableCors();
  }

  private _setVersion() {
    this._app.enableVersioning({
      type: VersioningType.URI,
    });
  }

  private async _swagger() {
    this._setUpBasicAuth();
    this._setUpOpenAPIMiddleware();
  }

  private _setUpBasicAuth() {
    this._app.use(
      ["/docs", "/docs-json"],
      expressBasicAuth({
        challenge: true,
        users: {
          [ConfigService.swaggerAdminAuth().SWAGGER_ADMIN_USER]:
            ConfigService.swaggerAdminAuth().SWAGGER_ADMIN_PASSWORD,
        },
      })
    );
  }

  private _setUpOpenAPIMiddleware() {
    this._app.enableCors({
      origin: "*",
      methods: "GET,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 200,
    });
    const swaggerCustomOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };

    const options = new DocumentBuilder()
      .setTitle("Hacker API Documents")
      .setDescription("API lists")
      .setVersion("0.0.1")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT tokwn",
          in: "header",
        },
        "Authorization"
      )
      .build();

    const document = SwaggerModule.createDocument(this._app, options);
    SwaggerModule.setup("docs", this._app, document, swaggerCustomOptions);
  }

  //todo
  // private _setSentry() {
  //   Sentry.init({
  //     dsn: this._config.sentryConfig.dsn,
  //   });
  // }

  startLog() {
    if (this._NODE_ENV === "production") {
      this._logger.log(`
#####################################################
🚀 Server on port ${ConfigService.appPort()} !
#####################################################
`);
    } else {
      this._logger.log(`
#####################################################
🚀 Server on http://localhost:${ConfigService.appPort()} !
#####################################################
`);
    }
  }

  async bootstrap() {
    this._setServerOption(this._app);
    // this._setSentry();
    await this._swagger();
    await this._app.listen(ConfigService.appPort());
  }
}
