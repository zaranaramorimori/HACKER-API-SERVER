import { ConfigService } from "@configs/enviornment.config";
import { TypeOrmModule } from "@nestjs/typeorm";

export function getTypeOrmModule() {
  return TypeOrmModule.forRoot(ConfigService.typeormConfig());
}
