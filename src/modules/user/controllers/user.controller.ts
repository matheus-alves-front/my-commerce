import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Inject,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { IUserService, USER_SERVICE } from '../interfaces/user.service.interface';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos/user.dto';
import { JwtAuthGuardUser } from 'src/modules/auth/guards/jwt-user.guard';

@Controller('users')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @UseGuards(JwtAuthGuardUser)
  @Get('profile')
  async getProfile(@AuthUser() user: User): Promise<UserDto> {
    return new UserDto(user);
  }

  @UseGuards(JwtAuthGuardUser)
  @Get()
  async findAll(@AuthUser() user: User): Promise<UserDto[]> {
    // Apenas usuários com papel ADMIN podem listar todos os usuários
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const users = await this.userService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @UseGuards(JwtAuthGuardUser)
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<UserDto> {
    // Usuários podem visualizar apenas seu próprio perfil ou, se ADMIN, qualquer usuário
    if (user.id !== id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const foundUser = await this.userService.findById(id);
    return new UserDto(foundUser);
  }

  @UseGuards(JwtAuthGuardUser)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() user: User,
  ): Promise<UserDto> {
    // Apenas ADMIN pode criar novos usuários
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const newUser = await this.userService.create(createUserDto);
    return new UserDto(newUser);
  }

  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: User,
  ): Promise<UserDto> {
    // Usuários podem atualizar apenas seu próprio perfil ou, se ADMIN, qualquer usuário
    if (user.id !== id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new UserDto(updatedUser);
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    // Apenas ADMIN pode excluir usuários
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    await this.userService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
