import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IShippingMethodService, SHIPPING_METHOD_SERVICE } from '../interfaces/shipping-method.service.interface';
import { IShippingMethodRepository, SHIPPING_METHOD_REPOSITORY } from '../interfaces/shipping-method.repository.interface';
import { ShippingMethod } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateShippingMethodDto, UpdateShippingMethodDto } from '../dtos/shipping-method.dto';

@Injectable()
export class ShippingMethodService implements IShippingMethodService {
  constructor(
    @Inject(SHIPPING_METHOD_REPOSITORY)
    private readonly shippingMethodRepository: IShippingMethodRepository,
  ) {}

  async findAll(storeId: string, query: QueryDto): Promise<ShippingMethod[]> {
    return this.shippingMethodRepository.findAll(storeId, query);
  }

  async findById(id: string): Promise<ShippingMethod> {
    const shippingMethod = await this.shippingMethodRepository.findById(id);
    if (!shippingMethod) {
      throw new NotFoundException('ShippingMethod not found');
    }
    return shippingMethod;
  }

  async create(storeId: string, createShippingMethodDto: CreateShippingMethodDto): Promise<ShippingMethod> {
    return this.shippingMethodRepository.create({
      ...createShippingMethodDto,
      store: {
        connect: {
          id: storeId
        }
      }
    });
  }

  async update(id: string, updateShippingMethodDto: UpdateShippingMethodDto): Promise<ShippingMethod> {
    const existingShippingMethod = await this.shippingMethodRepository.findById(id);
    if (!existingShippingMethod) {
      throw new NotFoundException('ShippingMethod not found');
    }
    return this.shippingMethodRepository.update(id, {
      ...updateShippingMethodDto,
    });
  }

  async delete(id: string): Promise<void> {
    const existingShippingMethod = await this.shippingMethodRepository.findById(id);
    if (!existingShippingMethod) {
      throw new NotFoundException('ShippingMethod not found');
    }
    await this.shippingMethodRepository.delete(id);
  }
}
