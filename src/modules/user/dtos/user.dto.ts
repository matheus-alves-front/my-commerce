import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
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

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
