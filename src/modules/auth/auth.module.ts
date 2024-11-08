// src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserController } from './controllers/auth-user.controller';
import { AuthCustomerController } from './controllers/auth-customer.controller';
import { AuthUserService } from './services/auth-user.service';
import { AuthCustomerService } from './services/auth-customer.service';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';
import { JwtCustomerStrategy } from './strategies/jwt-customer.strategy';
import { AUTH_USER_SERVICE } from './interfaces/auth-user.service.interface';
import { AUTH_CUSTOMER_SERVICE } from './interfaces/auth-customer.service.interface';
import { UserModule } from '../user/user.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
    CustomerModule,
  ],
  controllers: [AuthUserController, AuthCustomerController],
  providers: [
    {
      provide: AUTH_USER_SERVICE,
      useClass: AuthUserService,
    },
    {
      provide: AUTH_CUSTOMER_SERVICE,
      useClass: AuthCustomerService,
    },
    JwtUserStrategy,
    JwtCustomerStrategy,
  ],
  exports: [AUTH_USER_SERVICE, AUTH_CUSTOMER_SERVICE],
})
export class AuthModule {}
