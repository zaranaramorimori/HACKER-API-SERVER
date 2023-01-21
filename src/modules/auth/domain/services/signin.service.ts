import { JwtPayload } from "@libraries/jwt/jwt.payload";
import { JwtHandlerService } from "@libraries/jwt/jwt.service";
import { OAuth } from "@libraries/utils/oauth.util";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  SigninInboundPort,
  SigninInboundPortInputDto,
  SigninInboundPortOutputDto,
} from "../ports/in/signin.port";
import { FindUserOutboundPort } from "../ports/out/find-user.port";
import { SetTokenOutboundPort } from "../ports/out/set-token.port";

@Injectable()
export class SigninService implements SigninInboundPort {
  private readonly _jwt: JwtHandlerService;
  private readonly _oauth: OAuth;

  constructor(
    private readonly _findUserOutboundPort: FindUserOutboundPort,
    private readonly _setTokenOutboundPort: SetTokenOutboundPort
  ) {
    this._jwt = new JwtHandlerService(new JwtService());
    this._oauth = new OAuth();
  }

  async execute(
    params: SigninInboundPortInputDto
  ): Promise<SigninInboundPortOutputDto> {
    const uuid = await this._oauth.connect(params.provider)(params.token);
    const existedUser = await this._findUserOutboundPort.findUser("uuid", uuid);

    const jwtPayload: JwtPayload = {
      id: existedUser.id,
      uuid: existedUser.uuid,
    };
    const newAccessToken = this._jwt.getAccessToken(jwtPayload);
    const newRefreshToken = this._jwt.getRefreshToken();

    await this._setTokenOutboundPort.setToken({
      uuid,
      refreshToken: newRefreshToken,
    });

    //todo response 로직.. ( custom mapper를 만들던가 해야할듯 )
    return {
      id: existedUser.id,
      nickname: existedUser.nickname,
      username: existedUser.username,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
