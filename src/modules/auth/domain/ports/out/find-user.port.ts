export type FindUserOutboundPortOutputDto = {
  id: bigint;
  uuid: string;
  nickname: string;
  username: string;
};

export const FIND_USER_BY_UUID_OUTBOUND_PORT = "FIND_USER_OUTBOUND_PORT";

export interface FindUserOutboundPort {
  findUser(
    key: string,
    value: string | bigint
  ): Promise<FindUserOutboundPortOutputDto>;
}
