import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IStoreService } from '../interfaces/store.service.interface';
import { IStoreRepository, STORE_REPOSITORY } from '../interfaces/store.repository.interface';
import { Store, User } from '@prisma/client';
import { CreateStoreDto } from '../dtos/store.dto';

@Injectable()
export class StoreService implements IStoreService {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async create(owner: User,createStoreDto: CreateStoreDto): Promise<Store> {
    if (owner.role !== 'HOST') throw new HttpException('Only host user can create a Store', HttpStatus.UNAUTHORIZED)

    return this.storeRepository.create({
      ...createStoreDto,
      owner: {
        connect: {
          id: owner.id
        }
      }
    });
  }

  async findById(id: string): Promise<Store | null> {
    return this.storeRepository.findById(id);
  }

  // Implementar outros métodos
}
