// src/common/decorators/auth-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
