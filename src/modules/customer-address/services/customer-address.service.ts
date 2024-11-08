// src/modules/address/services/address.service.ts
import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Address } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { PrismaService } from '../../../common/modules/Prisma/prisma.service';
import { CUSTOMER_ADDRESS_REPOSITORY, ICustomerAddressRepository } from '../interfaces/customer-address.repository.interface';
import { ICustomerAddressService } from '../interfaces/customer-address.service.interface';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/customer-address.dto';

@Injectable()
export class CustomerAddressService implements ICustomerAddressService {
  constructor(
    @Inject(CUSTOMER_ADDRESS_REPOSITORY)
    private readonly CustomerAddressRepository: ICustomerAddressRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(customerId: string, query: QueryDto): Promise<Address[]> {
    return this.CustomerAddressRepository.findAll(customerId, query);
  }

  async findById(id: string): Promise<Address> {
    const address = await this.CustomerAddressRepository.findById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async create(customerId: string, createAddressDto: CreateAddressDto): Promise<Address> {
    if (createAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: { customerId, isDefault: true },
        data: { isDefault: false },
      });
    }
    return this.CustomerAddressRepository.create({
      ...createAddressDto,
      customer: {
        connect: {
          id: customerId
        }
      }
    });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const existingAddress = await this.CustomerAddressRepository.findById(id);
    if (!existingAddress) {
      throw new NotFoundException('Address not found');
    }

    if (updateAddressDto.isDefault !== undefined && updateAddressDto.isDefault) {
      await this.prisma.address.updateMany({
        where: { customerId: existingAddress.customerId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.CustomerAddressRepository.update(id, {
      ...updateAddressDto,
    });
  }

  async delete(id: string): Promise<void> {
    const existingAddress = await this.CustomerAddressRepository.findById(id);
    if (!existingAddress) {
      throw new NotFoundException('Address not found');
    }
    await this.CustomerAddressRepository.delete(id);
  }
}
