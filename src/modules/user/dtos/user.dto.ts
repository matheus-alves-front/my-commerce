// src/modules/user/dtos/user.dto.ts
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole, User } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class UserDto implements User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
