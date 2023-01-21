import { SocialPlatform } from "@libraries/entities/domain/user/user-orm.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export abstract class AuthBaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  provider: SocialPlatform;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
