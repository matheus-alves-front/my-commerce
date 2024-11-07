// src/modules/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserRepository } from './database/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { USER_REPOSITORY } from './interfaces/user.repository.interface';
import { USER_SERVICE } from './interfaces/user.service.interface';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class UserModule {}
