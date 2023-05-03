import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

  @Post()
  create(@Body() createProvinciaDto: CreateProvinciaDto) {
    return this.provinciasService.create(createProvinciaDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.provinciasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinciasService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvinciaDto: UpdateProvinciaDto,
  ) {
    return this.provinciasService.update(+id, updateProvinciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinciasService.remove(+id);
  }
}
