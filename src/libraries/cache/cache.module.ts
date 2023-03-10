import { EInfraInjectionToken } from "@configs/token/InfraInjectionToken";
import { Logger, Module } from "@nestjs/common";

import { CacheService } from "./cache.service";

const CacheServiceProvider = {
  provide: EInfraInjectionToken.REDIS_JOB.name,
  useClass: CacheService,
};

@Module({
  providers: [CacheServiceProvider, Logger],
  exports: [CacheServiceProvider],
})
export class CacheModule {}
