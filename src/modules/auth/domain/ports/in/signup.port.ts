import { SocialPlatform } from "@libraries/entities/domain/user/user-orm.entity";

export type SignupInboundPortInputDto = {
  provider: SocialPlatform;
  token: string;
  nickname: string;
  username: string;
};

export type SignupInboundPortOutputDto = {
  id: bigint;
  username: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

export const SIGNUP_INBOUND_PORT = "SIGNUP_INBOUND_PORT";

export interface SignupInboundPort {
  execute(
    params: SignupInboundPortInputDto
  ): Promise<SignupInboundPortOutputDto>;
}
