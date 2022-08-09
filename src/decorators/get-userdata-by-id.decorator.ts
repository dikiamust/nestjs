import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserDataById = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
