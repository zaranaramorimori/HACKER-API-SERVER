import { ConfigService } from "@configs/enviornment.config";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { CacheServiceInterface } from "./cache.interface";

@Injectable()
export class CacheService implements CacheServiceInterface {
  private readonly _redis: Redis;

  constructor() {
    this._redis = new Redis(ConfigService.redisConfig()).on(
      "error",
      this.onConnectRedisError
    );
  }

  async set(key: string, value: string): Promise<void> {
    await this._redis.set(key, value);
  }

  async sadd(key: string, value: string): Promise<void> {
    await this._redis.sadd(key, value);
  }

  async get(key: string): Promise<string> {
    return await this._redis
      .get(key)
      .then(result => result)
      .catch(() => null);
  }

  async smembers(key: string): Promise<string[]> {
    return await this._redis.smembers(key);
  }

  async exist(key: string): Promise<number> {
    return await this._redis.exists(key);
  }

  async setRefreshToken(key: string, refreshToken: string): Promise<void> {
    await this._redis.setex(
      key,
      ConfigService.jwtConfig().JWT_REFRESH_EXPIRATION,
      refreshToken
    );
  }

  onConnectRedisError(error: Error): Promise<void> {
    console.error(error.stack);
    process.exit(1);
  }
}
