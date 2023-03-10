import { SocialPlatform } from "@libraries/entities/domain/user/user-orm.entity";

export type SigninInboundPortInputDto = {
  provider: SocialPlatform;
  token: string;
};

export type SigninInboundPortOutputDto = {
  id: bigint;
  username: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

export const SIGNIN_INBOUND_PORT = "SIGNIN_INBOUND_PORT";

export interface SigninInboundPort {
  execute(
    params: SigninInboundPortInputDto
  ): Promise<SigninInboundPortOutputDto>;
}
