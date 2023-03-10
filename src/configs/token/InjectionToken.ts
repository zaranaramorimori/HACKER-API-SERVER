import { Enum, EnumType } from "ts-jenum";

@Enum("token")
export abstract class EInjectionToken extends EnumType<EInjectionToken>() {
  protected constructor(
    private readonly _token: string,
    readonly _name: string
  ) {
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
