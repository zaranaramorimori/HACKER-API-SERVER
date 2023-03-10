export type WithdrawInboundPortInputDto = {
  userId: number;
};

export const WITHDRAW_INBOUND_PORT = "WITHDRAW_INBOUND_PORT";

export interface WithdrawInboundPort {
  execute(params: WithdrawInboundPortInputDto): Promise<void>;
}
