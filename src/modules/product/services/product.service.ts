// src/modules/product/services/product.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IProductService, PRODUCT_SERVICE } from '../interfaces/product.service.interface';
import { IProductRepository, PRODUCT_REPOSITORY } from '../interfaces/product.repository.interface';
import { Product } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async findAll(query: QueryDto): Promise<Product[]> {
    return this.productRepository.findAll(query);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findBySlug(slug);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Valida se as categorias existem
    if (createProductDto.categoryIds && createProductDto.categoryIds.length > 0) {
      // Aqui você pode adicionar a lógica para verificar se as categorias existem
      // ou utilizar transações para garantir a integridade
    }

    return this.productRepository.create({
      ...createProductDto,
      categories: {
        connect: createProductDto.categoryIds
          ? createProductDto.categoryIds.map((id) => ({ id }))
          : [],
      },
      store: {
        connect: undefined
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    // Lógica para atualizar categorias, se necessário
    if (updateProductDto.categoryIds) {
      // Atualize as categorias conforme a necessidade
    }

    return this.productRepository.update(id, {
      ...updateProductDto,
      categories: updateProductDto.categoryIds
        ? {
            set: updateProductDto.categoryIds.map((id) => ({ id })),
          }
        : undefined,
    });
  }

  async delete(id: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(id);
  }
}
