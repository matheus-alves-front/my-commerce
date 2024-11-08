import { CreateUserDto } from 'src/modules/user/dtos/user.dto';
import { LoginDto } from '../dtos/auth.dto';

export const AUTH_USER_SERVICE = Symbol('IAuthUserService');

export interface IAuthUserService {
  login(body: LoginDto): Promise<{ access_token: string }>;
  register(registerUserDto: CreateUserDto): Promise<{ access_token: string }>;
}
