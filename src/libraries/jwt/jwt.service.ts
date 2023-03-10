import { ConfigService } from "@configs/enviornment.config";
import { TOKEN_TYPE } from "@libraries/api/response";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class JwtHandlerService {
  constructor(private readonly _jwt: JwtService) {}

  //* Access Token 발급
  getAccessToken(payload: JwtPayload) {
    return this._jwt.sign(payload, {
      secret: ConfigService.jwtConfig().JWT_SECRET,
      expiresIn: ConfigService.jwtConfig().JWT_ACCESS_EXPIRATION,
    });
  }

  //* Refresh Token 발급
  getRefreshToken() {
    return this._jwt.sign(
      {},
      {
        secret: ConfigService.jwtConfig().JWT_SECRET,
        expiresIn: ConfigService.jwtConfig().JWT_REFRESH_EXPIRATION,
      }
    );
  }

  //* Token 검증
  verify(token: string) {
    let decoded: any;

    try {
      decoded = this._jwt.verify(token, {
        secret: ConfigService.jwtConfig().JWT_SECRET,
      });
    } catch (error: any) {
      if (error.message === "jwt expired") {
        return TOKEN_TYPE.TOKEN_EXPIRED;
      } else if (error.message === "invalid token") {
        return TOKEN_TYPE.TOKEN_INVALID;
      } else {
        return TOKEN_TYPE.TOKEN_INVALID;
      }
    }

    return decoded;
  }
}
