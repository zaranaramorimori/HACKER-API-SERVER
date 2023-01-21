export type RenewalTokenInboundPortInputDto = {
  accessToken: string;
  refreshToken: string;
};

export type RenewalTokenInboundPortOutputDto = {
  accessToken: string;
};

export const RENEWAL_TOKEN_INBOUND_PORT = "RENEWAL_TOKEN_INBOUND_PORT";

export interface RenewalTokenInboundPort {
  execute(
    params: RenewalTokenInboundPortInputDto
  ): Promise<RenewalTokenInboundPortOutputDto>;
}
