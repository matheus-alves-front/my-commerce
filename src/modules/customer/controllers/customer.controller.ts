import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Get,
  Param,
  UseGuards,
  Inject,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { CUSTOMER_SERVICE, ICustomerService } from '../interfaces/customer.service.interface';
import { CreateCustomerDto, UpdateCustomerDto, CustomerDto } from '../dtos/customer.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuardUser } from 'src/modules/auth/guards/jwt-user.guard';

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customerService: ICustomerService,
  ) {}

  @UseGuards(JwtAuthGuardUser)
  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @AuthUser() user: User,
  ): Promise<CustomerDto> {
    // Apenas ADMIN pode criar clientes
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN users can create customers');
    }
    const customer = await this.customerService.create(createCustomerDto);
    return new CustomerDto(customer);
  }

  @UseGuards(JwtAuthGuardUser)
  @Get()
  async findAll(@AuthUser() user: User): Promise<CustomerDto[]> {
    // Apenas ADMIN pode listar todos os clientes
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const customers = await this.customerService.findAll();
    return customers.map((customer) => new CustomerDto(customer));
  }

  @UseGuards(JwtAuthGuardUser)
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<CustomerDto> {
    // Usuários podem acessar apenas seu próprio perfil ou, se ADMIN, qualquer cliente
    if (user.id !== id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const customer = await this.customerService.findById(id);
    return new CustomerDto(customer);
  }

  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @AuthUser() user: User,
  ): Promise<CustomerDto> {
    // Usuários podem atualizar apenas seu próprio perfil ou, se ADMIN, qualquer cliente
    if (user.id !== id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const updatedCustomer = await this.customerService.update(id, updateCustomerDto);
    return new CustomerDto(updatedCustomer);
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    // Apenas ADMIN pode deletar clientes
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN users can delete customers');
    }
    await this.customerService.delete(id);
    return { message: 'Customer deleted successfully' };
  }
}
