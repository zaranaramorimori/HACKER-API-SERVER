import { routesV1 } from "@configs/routes.config";
import { InternalServerError } from "@libraries/api/response/swagger/error/InternalServerError";
import { UnauthorizedError } from "@libraries/api/response/swagger/error/UnauthorizedError";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { NotFoundError } from "rxjs";
import {
  SignupInboundPort,
  SIGNUP_INBOUND_PORT,
} from "../domain/ports/in/signup.port";
import { SignupRequestDto } from "../dtos/signup.req.dto";

@Controller(routesV1.version)
export class SignupController {
  constructor(
    @Inject(SIGNUP_INBOUND_PORT)
    private readonly _signupInboundPort: SignupInboundPort
  ) {}

  @ApiOperation({
    summary: "회원가입을 진행합니다.",
    description: ``,
  })
  @ApiOkResponse({
    description: "회원가입에 성공했습니다.",
    type: "",
  })
  @ApiUnauthorizedResponse({
    description: "인증 되지 않은 요청입니다.",
    type: UnauthorizedError,
  })
  @ApiConflictResponse({
    description: "존재하지 않는 유저입니다.",
    type: NotFoundError,
  })
  @ApiInternalServerErrorResponse({
    description: "서버 내부 오류",
    type: InternalServerError,
  })
  @Post(routesV1.auth.signup)
  async handle(@Body() body: SignupRequestDto) {
    return this._signupInboundPort.execute(body);
  }
}
