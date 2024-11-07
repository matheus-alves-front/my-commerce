import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Customer } from '@prisma/client';

export const AuthCustomer = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Customer => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
