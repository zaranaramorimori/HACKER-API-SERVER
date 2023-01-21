import { Enum, EnumType } from "ts-jenum";

@Enum("token")
export class EApplicationInjectionToken extends EnumType<EApplicationInjectionToken>() {
  static readonly AUTH_JOB = new EApplicationInjectionToken(
    "AUTH_JOB",
    "authJob"
  );

  private constructor(readonly _token: string, readonly _name: string) {
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
