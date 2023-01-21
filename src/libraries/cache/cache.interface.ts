export interface CacheServiceInterface {
  set(key: string, value: string): Promise<void>;
  sadd(key: string, value: string): Promise<void>;
  get(key: string): Promise<string>;
  smembers(key: string): Promise<string[]>;
  exist(key: string): Promise<number>;
  setRefreshToken(key: string, refreshToken: string): Promise<void>;
}
