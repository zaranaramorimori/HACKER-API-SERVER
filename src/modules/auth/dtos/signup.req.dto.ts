import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { AuthBaseDto } from "./auth-base.dto";

export class SignupRequestDto extends AuthBaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}
