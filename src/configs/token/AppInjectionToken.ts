import { EInjectionToken } from "./InjectionToken";

export class EApplicationInjectionToken extends EInjectionToken {
  static readonly AUTH_JOB = new EApplicationInjectionToken(
    "AUTH_JOB",
    "authJob"
  );
}
