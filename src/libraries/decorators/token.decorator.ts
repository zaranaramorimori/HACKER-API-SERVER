import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator(
  (_, ctx: ExecutionContext): ParameterDecorator => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;
    return request.user;
  }
);
