import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './interfaces/user.repository.interface';
import { UserRepository } from './database/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';
import { USER_SERVICE } from './interfaces/user.service.interface';

@Module({
  imports: [PrismaModule],
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
