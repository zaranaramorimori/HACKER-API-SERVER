import { CacheModule } from "@libraries/cache/cache.module";
import { UserOrmEntity } from "@libraries/entities/domain/user/user-orm.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignupAdapter } from "./adapters/signup.adapter";
import { SignupController } from "./controllers/signup.controller";
import { SIGNUP_INBOUND_PORT } from "./domain/ports/in/signup.port";
import { SignupService } from "./domain/services/signup.service";

@Module({
  controllers: [SignupController],
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CacheModule],
  providers: [
    SignupAdapter,
    {
      provide: SIGNUP_INBOUND_PORT,
      useFactory: signupAdatper => {
        return new SignupService(signupAdatper, signupAdatper, signupAdatper);
      },
      inject: [SignupAdapter],
    },
  ],
})
export class SignupModule {}
