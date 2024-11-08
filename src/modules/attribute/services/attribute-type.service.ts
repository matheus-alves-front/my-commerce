import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAttributeTypeService } from '../interfaces/attribute-type.service.interface';
import { IAttributeTypeRepository, ATTRIBUTE_TYPE_REPOSITORY } from '../interfaces/attribute-type.repository.interface';
import { AttributeType } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateAttributeTypeDto, UpdateAttributeTypeDto } from '../dtos/attribute-type.dto';

@Injectable()
export class AttributeTypeService implements IAttributeTypeService {
  constructor(
    @Inject(ATTRIBUTE_TYPE_REPOSITORY)
    private readonly attributeTypeRepository: IAttributeTypeRepository,
  ) {}

  async findAll(query: QueryDto): Promise<AttributeType[]> {
    return this.attributeTypeRepository.findAll(query);
  }

  async findById(id: string): Promise<AttributeType> {
    const attributeType = await this.attributeTypeRepository.findById(id);
    if (!attributeType) {
      throw new NotFoundException('AttributeType not found');
    }
    return attributeType;
  }

  async create(createAttributeTypeDto: CreateAttributeTypeDto): Promise<AttributeType> {
    return this.attributeTypeRepository.create({
      ...createAttributeTypeDto,
    });
  }

  async update(id: string, updateAttributeTypeDto: UpdateAttributeTypeDto): Promise<AttributeType> {
    const existingAttributeType = await this.attributeTypeRepository.findById(id);
    if (!existingAttributeType) {
      throw new NotFoundException('AttributeType not found');
    }
    return this.attributeTypeRepository.update(id, {
      ...updateAttributeTypeDto,
    });
  }

  async delete(id: string): Promise<void> {
    const existingAttributeType = await this.attributeTypeRepository.findById(id);
    if (!existingAttributeType) {
      throw new NotFoundException('AttributeType not found');
    }
    await this.attributeTypeRepository.delete(id);
  }
}
