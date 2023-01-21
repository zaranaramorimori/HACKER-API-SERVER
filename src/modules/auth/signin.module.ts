import { CacheModule } from "@libraries/cache/cache.module";
import { UserOrmEntity } from "@libraries/entities/domain/user/user-orm.entity";
import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { SigninAdapter } from "./adapters/signin.adapter";
import { SigninController } from "./controllers/signin.controller";
import { SIGNIN_INBOUND_PORT } from "./domain/ports/in/signin.port";
import { SigninService } from "./domain/services/signin.service";

@Module({
  controllers: [SigninController],
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CacheModule],
  providers: [
    SigninAdapter,
    {
      provide: SIGNIN_INBOUND_PORT,
      useFactory: signinAdatper => {
        return new SigninService(signinAdatper, signinAdatper);
      },
      inject: [SigninAdapter],
    },
  ],
})
export class SigninModule {}
