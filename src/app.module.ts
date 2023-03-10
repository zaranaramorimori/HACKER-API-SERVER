import { getTypeOrmModule } from "@configs/getTypeormModule";
import { validationSchema } from "@configs/validationSchema";
import { LoggerModule } from "@libraries/logger.module";
import { SigninModule } from "@modules/auth/signin.module";
import { SignupModule } from "@modules/auth/signup.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

const AuthModules = [SigninModule, SignupModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      validationSchema,
    }),
    LoggerModule,
    getTypeOrmModule(),
    ...AuthModules,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: SentryInterceptor,
    // },
  ],
})
export class AppModule {}
