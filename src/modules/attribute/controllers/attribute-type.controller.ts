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
import { IAttributeTypeService, ATTRIBUTE_TYPE_SERVICE } from '../interfaces/attribute-type.service.interface';
import { AttributeType } from '@prisma/client';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { CreateAttributeTypeDto, UpdateAttributeTypeDto } from '../dtos/attribute-type.dto';

@Controller('attribute-types')
@UseGuards(JwtAuthGuardUser)
export class AttributeTypeController {
  constructor(
    @Inject(ATTRIBUTE_TYPE_SERVICE)
    private readonly attributeTypeService: IAttributeTypeService,
  ) {}

  @Get()
  async findAll(@Query() query: QueryDto): Promise<AttributeType[]> {
    return this.attributeTypeService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<AttributeType> {
    return this.attributeTypeService.findById(id);
  }

  @Post()
  async create(
    @Body() createAttributeTypeDto: CreateAttributeTypeDto,
    @AuthUser() user: User,
  ): Promise<AttributeType> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    return this.attributeTypeService.create(createAttributeTypeDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAttributeTypeDto: UpdateAttributeTypeDto,
    @AuthUser() user: User,
  ): Promise<AttributeType> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    return this.attributeTypeService.update(id, updateAttributeTypeDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    await this.attributeTypeService.delete(id);
    return { message: 'AttributeType deleted successfully' };
  }
}
