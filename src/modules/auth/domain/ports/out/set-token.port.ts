export type SetTokenOutboundPortInputDto = {
  uuid: string;
  refreshToken: string;
};

export type SetTokenOutboundPortOutputDto = void;

export const SET_TOKEN_OUTBOUND_PORT = "SET_TOKEN_OUTBOUND_PORT";

export interface SetTokenOutboundPort {
  setToken(
    params: SetTokenOutboundPortInputDto
  ): Promise<SetTokenOutboundPortOutputDto>;
}
