import { QueryLoggerUtil } from "@libraries/utils/query-logger.util";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as path from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

class DBConfig {
  readonly type: string;
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

class RedisConfig {
  readonly host: string;
  readonly port: number;
}

class SwaggerAdminConfig {
  readonly SWAGGER_ADMIN_USER: string;
  readonly SWAGGER_ADMIN_PASSWORD: string;
}

class JwtConfig {
  readonly JWT_SECRET: string;
  readonly JWT_ACCESS_EXPIRATION: string;
  readonly JWT_REFRESH_EXPIRATION: string;
}

@Injectable()
export class ConfigService {
  static appPort(): number {
    return +process.env.PORT || 3000;
  }

  static nodeEnv(): string {
    return process.env.NODE_ENV;
  }

  static swaggerAdminAuth(): SwaggerAdminConfig {
    const { SWAGGER_ADMIN_USER, SWAGGER_ADMIN_PASSWORD } = process.env;
    return { SWAGGER_ADMIN_USER, SWAGGER_ADMIN_PASSWORD };
  }

  static jwtConfig(): JwtConfig {
    const { JWT_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION } =
      process.env;
    return { JWT_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION };
  }

  //todo
  // static sentryWebhookUrl(): string {
  //   // todo
  // }

  static redisConfig(): RedisConfig {
    const [host, port] = [process.env.REDIS_HOST, process.env.REDIS_PORT];
    return { host, port: Number(port) };
  }

  static typeormConfig(): TypeOrmModuleOptions {
    return {
      ...this.databaseConfig(),
      timezone: 'Asia/Seoul',
      logger: new QueryLoggerUtil(),
      entities: [
        path.join(
          __dirname,
          "..",
          "libraries/entities/domain/**/*.entity.{js,ts}"
        ),
      ],
      migrations: [
        path.join(__dirname, "..", "libraries/entities/migrations/*{.ts,.js}"),
      ],
      cli: { migrationsDir: "src/libraries/entities/migrations" },
      migrationsTableName: "migrations",
      autoLoadEntities: true,
      keepConnectionAlive: true,
      namingStrategy: new SnakeNamingStrategy(),
      maxQueryExecutionTime: +process.env.DB_CONNECTION_TIMEOUT,
      extra: {
        statement_timeout: +process.env.DB_CONNECTION_TIMEOUT,
      },
    };
  }

  static testTypeormConfig(): TypeOrmModuleOptions {
    return {
      ...this.databaseConfig(),
      timezone: 'Asia/Seoul',
      entities: [
        path.join(
          __dirname,
          "..",
          "libraries/entities/domain/**/*.entity.{js,ts}"
        ),
      ],
      migrations: [
        path.join(__dirname, "..", "libraries/entities/migrations/*{.ts,.js}"),
      ],
      cli: { migrationsDir: "src/libraries/entities/migrations" },
      migrationsTableName: "migrations",
      autoLoadEntities: true,
      keepConnectionAlive: true,
      namingStrategy: new SnakeNamingStrategy(),
      maxQueryExecutionTime: +process.env.DB_CONNECTION_TIMEOUT,
      extra: {
        statement_timeout: +process.env.DB_CONNECTION_TIMEOUT,
      },
    };
  }

  static databaseConfig(): DBConfig {
    const [
      type,
      host,
      port,
      username,
      password,
      database,
      logging,
      synchronize,
    ] = [
            process.env.DB_TYPE,
            process.env.DB_HOST,
            process.env.DB_PORT,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            process.env.DB_DATABASE_NAME,
            process.env.DB_LOGGING,
            process.env.DB_SYNC,
          ];

    return {
      type,
      host,
      port: +port,
      database,
      username,
      password,
      synchronize: Boolean(synchronize),
      logging: Boolean(logging),
    };
  }
}
