import { SocialPlatform } from "@libraries/entities/domain/user/user-orm.entity";

export type CreateUserOutboundPortInputDto = {
  provider: SocialPlatform;
  uuid: string;
  nickname: string;
  username: string;
};

export type CreateUserOutboundPortOutputDto = {
  id: bigint;
  uuid: string;
  nickname: string;
  username: string;
};

export const CREATE_USER_OUTBOUND_PORT = "CREATE_USER_OUTBOUND_PORT";

export interface CreateUserOutboundPort {
  createUser(
    params: CreateUserOutboundPortInputDto
  ): Promise<CreateUserOutboundPortOutputDto>;
}
