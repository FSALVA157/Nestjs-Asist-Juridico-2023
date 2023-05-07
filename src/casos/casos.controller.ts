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
import { CasosService } from './casos.service';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('casos')
export class CasosController {
  constructor(private readonly casosService: CasosService) {}

  @Post()
  create(@Body() createCasoDto: CreateCasoDto) {
    return this.casosService.create(createCasoDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.casosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCasoDto: UpdateCasoDto) {
    return this.casosService.update(+id, updateCasoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casosService.remove(+id);
  }
}
