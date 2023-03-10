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
  SigninInboundPort,
  SIGNIN_INBOUND_PORT,
} from "../domain/ports/in/signin.port";
import { SigninRequestDto } from "../dtos/signin.req.dto";

@Controller(routesV1.version)
export class SigninController {
  constructor(
    @Inject(SIGNIN_INBOUND_PORT)
    private readonly _signinInboundPort: SigninInboundPort
  ) {}
  @ApiOperation({
    summary: "로그인을 진행합니다.",
    description: ``,
  })
  @ApiOkResponse({
    description: "로그인에 성공했습니다.",
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
  @Post(routesV1.auth.signin)
  async handle(@Body() body: SigninRequestDto) {
    //todo dto도 조금 고민해볼 필요 있음
    return this._signinInboundPort.execute(body);
  }
}
