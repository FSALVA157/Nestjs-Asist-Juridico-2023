import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('localidades')
export class LocalidadesController {
  constructor(private readonly localidadesService: LocalidadesService) {}

  @Post()
  create(@Body() createLocalidadDto: CreateLocalidadDto) {
    return this.localidadesService.create(createLocalidadDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.localidadesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalidadDto: UpdateLocalidadDto,
  ) {
    return this.localidadesService.update(+id, updateLocalidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localidadesService.remove(+id);
  }
}
