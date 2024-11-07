import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { IStoreService } from '../interfaces/store.service.interface';
import { IStoreRepository, STORE_REPOSITORY } from '../interfaces/store.repository.interface';
import { Store, User } from '@prisma/client';
import { CreateStoreDto, UpdateStoreDto } from '../dtos/store.dto';

@Injectable()
export class StoreService implements IStoreService {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async create(owner: User, createStoreDto: CreateStoreDto): Promise<Store> {
    if (owner.role !== 'HOST' && owner.role !== 'ADMIN') {
      throw new ForbiddenException('Only HOST or ADMIN users can create a store');
    }

    return this.storeRepository.create({
      ...createStoreDto,
      owner: {
        connect: {
          id: owner.id,
        },
      },
    });
  }

  async findById(id: string): Promise<Store> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepository.findAll();
  }

  async update(
    user: User,
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    const store = await this.findById(id);

    if (store.ownerId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }

    return this.storeRepository.update(id, updateStoreDto);
  }

  async delete(user: User, id: string): Promise<void> {
    const store = await this.findById(id);

    if (store.ownerId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }

    await this.storeRepository.delete(id);
  }
}
