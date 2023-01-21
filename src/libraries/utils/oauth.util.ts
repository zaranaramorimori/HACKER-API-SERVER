import { rm } from "@libraries/api/response";
import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import axios from "axios";
import jwt from "jsonwebtoken";

@Injectable()
export class OAuth {
  connect(provider: string): (token: string) => Promise<string> {
    return this[`${provider}Auth`];
  }

  private async kakaoAuth(kakaoAccessToken: string): Promise<string> {
    try {
      const user = await axios({
        method: "get",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      });

      const uuid = user.data.id;

      if (!uuid) throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);

      return uuid.toString();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async appleAuth(appleAccessToken: string): Promise<string> {
    try {
      const user = jwt.decode(appleAccessToken);
      const uuid = user.sub as string;

      if (!uuid || !user)
        throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);

      return uuid.toString();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async naverAuth(naverAccessToken: string): Promise<string> {
    try {
      const user = await axios({
        method: "get",
        url: "https://openapi.naver.com/v1/nid/me",
        headers: {
          Authorization: `Bearer ${naverAccessToken}`,
        },
      });

      const uuid = user.data.response.id;

      if (!uuid) throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);

      return uuid.toString();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async googleAuth(googleAccessToken: string): Promise<string> {
    try {
      const user = jwt.decode(googleAccessToken);
      const uuid = user.sub as string;

      if (!uuid || !user)
        throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);

      return uuid.toString();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
