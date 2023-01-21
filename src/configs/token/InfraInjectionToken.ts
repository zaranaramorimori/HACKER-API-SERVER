import { Enum, EnumType } from "ts-jenum";

@Enum("token")
export class EInfraInjectionToken extends EnumType<EInfraInjectionToken>() {
  static readonly REDIS_JOB = new EInfraInjectionToken("REDIS_JOB", "redisJob");

  private constructor(private readonly _token: string, readonly _name: string) {
    super();
  }

  get token(): string {
    return this._token;
  }

  get name(): string {
    return this._name;
  }

  get tokenWithName() {
    return {
      token: this._token,
      name: this._name,
    };
  }
}
