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
import { IAttributeService, ATTRIBUTE_SERVICE } from '../interfaces/attribute.service.interface';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';
import { QueryDto } from '../../../common/dtos/query.dto';
import { JwtAuthGuardUser } from '../../auth/guards/jwt-user.guard';
import { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { User } from '@prisma/client';

@Controller('attributes')
@UseGuards(JwtAuthGuardUser)
export class AttributeController {
  constructor(
    @Inject(ATTRIBUTE_SERVICE)
    private readonly attributeService: IAttributeService,
  ) {}

  @Get()
  async findAll(@Query() query: QueryDto): Promise<AttributeDto[]> {
    const attributes = await this.attributeService.findAll(query);
    return attributes.map((attribute) => new AttributeDto(attribute));
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<AttributeDto> {
    const attribute = await this.attributeService.findById(id);
    return new AttributeDto(attribute);
  }

  @Post()
  async create(
    @Body() createAttributeDto: CreateAttributeDto,
    @AuthUser() user: User,
  ): Promise<AttributeDto> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const attribute = await this.attributeService.create(createAttributeDto);
    return new AttributeDto(attribute);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
    @AuthUser() user: User,
  ): Promise<AttributeDto> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    const attribute = await this.attributeService.update(id, updateAttributeDto);
    return new AttributeDto(attribute);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUser() user: User,
  ): Promise<{ message: string }> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied');
    }
    await this.attributeService.delete(id);
    return { message: 'Attribute deleted successfully' };
  }
}
