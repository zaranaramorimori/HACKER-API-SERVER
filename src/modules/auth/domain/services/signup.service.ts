import { JwtPayload } from "@libraries/jwt/jwt.payload";
import { JwtHandlerService } from "@libraries/jwt/jwt.service";
import { OAuth } from "@libraries/utils/oauth.util";
import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  SignupInboundPort,
  SignupInboundPortInputDto,
  SignupInboundPortOutputDto,
} from "../ports/in/signup.port";
import { CreateUserOutboundPort } from "../ports/out/create-user.port";
import { FindUserOutboundPort } from "../ports/out/find-user.port";
import { SetTokenOutboundPort } from "../ports/out/set-token.port";

@Injectable()
export class SignupService implements SignupInboundPort {
  private readonly _jwt: JwtHandlerService;
  private readonly _oauth: OAuth;
  constructor(
    private readonly _findUserOutboundPort: FindUserOutboundPort,
    private readonly _setTokenOutboundPort: SetTokenOutboundPort,
    private readonly _createUserOutboundPort: CreateUserOutboundPort
  ) {
    this._jwt = new JwtHandlerService(new JwtService());
    this._oauth = new OAuth();
  }

  async execute(
    params: SignupInboundPortInputDto
  ): Promise<SignupInboundPortOutputDto> {
    const uuid = await this._oauth.connect(params.provider)(params.token);
    const alreadySignedUuid = await this._findUserOutboundPort.findUser("uuid", uuid);
    const alreadySignedNickname = await this._findUserOutboundPort.findUser("nickname", params.nickname);

    if (alreadySignedUuid || alreadySignedNickname)
      throw new ConflictException(
        "이미 가입한 유저이거나 사용중인 닉네임입니다."
      );

    const newRefreshToken = this._jwt.getRefreshToken();
    const newUser = await this._createUserOutboundPort.createUser({
      provider: params.provider,
      uuid,
      nickname: params.nickname,
      username: params.username,
    });

    await this._setTokenOutboundPort.setToken({
      uuid,
      refreshToken: newRefreshToken,
    });

    const jwtPayload: JwtPayload = {
      id: newUser.id,
      uuid: newUser.uuid,
    };
    const newAccessToken = this._jwt.getAccessToken(jwtPayload);

    //todo response 로직.. ( custom mapper를 만들던가 해야할듯 )

    return {
      id: newUser.id,
      nickname: newUser.nickname,
      username: newUser.username,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
