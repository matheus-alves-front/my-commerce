import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserService } from '../interfaces/user.service.interface';
import { IUserRepository, USER_REPOSITORY } from '../interfaces/user.repository.interface';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
