import { EInjectionToken } from "./InjectionToken";

export class EInfraInjectionToken extends EInjectionToken {
  static readonly REDIS_JOB = new EInfraInjectionToken("REDIS_JOB", "redisJob");
}
