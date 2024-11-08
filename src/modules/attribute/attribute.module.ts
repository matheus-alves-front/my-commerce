import { Module } from '@nestjs/common';
import { ATTRIBUTE_REPOSITORY } from './interfaces/attribute.repository.interface';
import { AttributeRepository } from './database/attribute.repository';
import { ATTRIBUTE_SERVICE } from './interfaces/attribute.service.interface';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { ATTRIBUTE_TYPE_REPOSITORY } from './interfaces/attribute-type.repository.interface';
import { AttributeTypeRepository } from './database/attribute-type.repository';
import { ATTRIBUTE_TYPE_SERVICE } from './interfaces/attribute-type.service.interface';
import { AttributeTypeService } from './services/attribute-type.service';
import { AttributeTypeController } from './controllers/attribute-type.controller';
import { PrismaModule } from '../../common/modules/Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ATTRIBUTE_REPOSITORY,
      useClass: AttributeRepository,
    },
    {
      provide: ATTRIBUTE_SERVICE,
      useClass: AttributeService,
    },
    {
      provide: ATTRIBUTE_TYPE_REPOSITORY,
      useClass: AttributeTypeRepository,
    },
    {
      provide: ATTRIBUTE_TYPE_SERVICE,
      useClass: AttributeTypeService,
    },
  ],
  controllers: [AttributeController, AttributeTypeController],
  exports: [ATTRIBUTE_SERVICE, ATTRIBUTE_REPOSITORY, ATTRIBUTE_TYPE_SERVICE, ATTRIBUTE_TYPE_REPOSITORY],
})
export class AttributeModule {}
