import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAttributeService, ATTRIBUTE_SERVICE } from '../interfaces/attribute.service.interface';
import { IAttributeRepository, ATTRIBUTE_REPOSITORY } from '../interfaces/attribute.repository.interface';
import { Attribute } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';

@Injectable()
export class AttributeService implements IAttributeService {
  constructor(
    @Inject(ATTRIBUTE_REPOSITORY)
    private readonly attributeRepository: IAttributeRepository,
  ) {}

  async findAll(query: QueryDto): Promise<Attribute[]> {
    return this.attributeRepository.findAll(query);
  }

  async findById(id: string): Promise<Attribute> {
    const attribute = await this.attributeRepository.findById(id);
    if (!attribute) {
      throw new NotFoundException('Attribute not found');
    }
    return attribute;
  }

  async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    // Verifique se o AttributeType e o Product existem
    // Isso pode ser feito dentro do repositório ou serviço
    return this.attributeRepository.create({
      name: '',
      value: '',
      product: null,
      attributeType: {
        connect: undefined
      }
    });
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<Attribute> {
    const existingAttribute = await this.attributeRepository.findById(id);
    if (!existingAttribute) {
      throw new NotFoundException('Attribute not found');
    }
    return this.attributeRepository.update(id, {
      ...updateAttributeDto,
    });
  }

  async delete(id: string): Promise<void> {
    const existingAttribute = await this.attributeRepository.findById(id);
    if (!existingAttribute) {
      throw new NotFoundException('Attribute not found');
    }
    await this.attributeRepository.delete(id);
  }
}
