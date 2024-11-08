import { Controller, Post, Body, Inject } from '@nestjs/common';
import { IAuthCustomerService, AUTH_CUSTOMER_SERVICE } from '../interfaces/auth-customer.service.interface';
import { CreateCustomerDto } from 'src/modules/customer/dtos/customer.dto';
import { LoginDto } from '../dtos/auth.dto';

@Controller('auth/customer')
export class AuthCustomerController {
  constructor(
    @Inject(AUTH_CUSTOMER_SERVICE)
    private readonly authCustomerService: IAuthCustomerService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authCustomerService.login(body);
  }

  @Post('register')
  async register(@Body() registerCustomerDto: CreateCustomerDto) {
    return await this.authCustomerService.register(registerCustomerDto);
  }
}
