import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { JurisdiccionService } from './jurisdiccion.service';
import { CreateJurisdiccionDto } from './dto/create-jurisdiccion.dto';
import { UpdateJurisdiccionDto } from './dto/update-jurisdiccion.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('jurisdiccion')
export class JurisdiccionController {
  constructor(private readonly jurisdiccionService: JurisdiccionService) {}

  @Post()
  create(@Body() createJurisdiccionDto: CreateJurisdiccionDto) {
    return this.jurisdiccionService.create(createJurisdiccionDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.jurisdiccionService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jurisdiccionService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateJurisdiccionDto: UpdateJurisdiccionDto,
  ) {
    return this.jurisdiccionService.update(+id, updateJurisdiccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jurisdiccionService.remove(+id);
  }
}
