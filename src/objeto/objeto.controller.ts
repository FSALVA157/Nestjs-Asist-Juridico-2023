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
import { ObjetoService } from './objeto.service';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('objeto')
export class ObjetoController {
  constructor(private readonly objetoService: ObjetoService) {}

  @Post()
  create(@Body() createObjetoDto: CreateObjetoDto) {
    return this.objetoService.create(createObjetoDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.objetoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objetoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObjetoDto: UpdateObjetoDto) {
    return this.objetoService.update(+id, updateObjetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objetoService.remove(+id);
  }
}
