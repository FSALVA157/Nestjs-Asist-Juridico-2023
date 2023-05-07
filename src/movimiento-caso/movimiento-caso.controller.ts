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
import { MovimientoCasoService } from './movimiento-caso.service';
import { CreateMovimientoCasoDto } from './dto/create-movimiento-caso.dto';
import { UpdateMovimientoCasoDto } from './dto/update-movimiento-caso.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('movimiento-caso')
export class MovimientoCasoController {
  constructor(private readonly movimientoCasoService: MovimientoCasoService) {}

  @Post()
  create(@Body() createMovimientoCasoDto: CreateMovimientoCasoDto) {
    return this.movimientoCasoService.create(createMovimientoCasoDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.movimientoCasoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoCasoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimientoCasoDto: UpdateMovimientoCasoDto,
  ) {
    return this.movimientoCasoService.update(+id, updateMovimientoCasoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoCasoService.remove(+id);
  }
}
