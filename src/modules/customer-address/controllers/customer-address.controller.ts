import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Inject,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { CUSTOMER_ADDRESS_SERVICE, ICustomerAddressService } from '../interfaces/customer-address.service.interface';
import { AddressDto, CreateAddressDto, UpdateAddressDto } from '../dtos/customer-address.dto';

@Controller('customer/:customerId/address')
@UseGuards(JwtAuthGuardUser)
export class AddressController {
  constructor(
    @Inject(CUSTOMER_ADDRESS_SERVICE)
    private readonly CustomerAddressService: ICustomerAddressService,
  ) {}

  @Get()
  async findAll(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Query() query: QueryDto,
    @AuthUser() user: User,
  ): Promise<AddressDto[]> {
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const addresses = await this.CustomerAddressService.findAll(customerId, query);
    return addresses.map((address) => new AddressDto(address));
  }

  @Get(':id')
  async findOne(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<AddressDto> {
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const address = await this.CustomerAddressService.findById(id);
    if (address.customerId !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    return new AddressDto(address);
  }

  @Post()
  async create(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Body() createAddressDto: CreateAddressDto,
    @AuthUser() user: User,
  ): Promise<AddressDto> {
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const address = await this.CustomerAddressService.create(customerId, createAddressDto);
    return new AddressDto(address);
  }

  @Put(':id')
  async update(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @AuthUser() user: User,
  ): Promise<AddressDto> {
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const address = await this.CustomerAddressService.update(id, updateAddressDto);
    if (address.customerId !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    return new AddressDto(address);
  }

  @Delete(':id')
  async delete(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN' && user.id !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    const address = await this.CustomerAddressService.findById(id);
    if (address.customerId !== customerId) {
      throw new ForbiddenException('Access denied');
    }
    await this.CustomerAddressService.delete(id);
    return { message: 'Address deleted successfully' };
  }
}
