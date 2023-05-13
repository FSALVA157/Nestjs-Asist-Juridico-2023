import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TipoProcesoService } from './tipo-proceso.service';
import { CreateTipoProcesoDto } from './dto/create-tipo-proceso.dto';
import { UpdateTipoProcesoDto } from './dto/update-tipo-proceso.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tipo-proceso')
export class TipoProcesoController {
  constructor(private readonly tipoProcesoService: TipoProcesoService) {}

  @Post()
  create(@Body() createTipoProcesoDto: CreateTipoProcesoDto) {
    return this.tipoProcesoService.create(createTipoProcesoDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.tipoProcesoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoProcesoService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoProcesoDto: UpdateTipoProcesoDto,
  ) {
    return this.tipoProcesoService.update(+id, updateTipoProcesoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoProcesoService.remove(+id);
  }
}
