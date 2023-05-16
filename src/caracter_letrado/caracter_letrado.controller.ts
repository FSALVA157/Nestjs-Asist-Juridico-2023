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
import { CaracterLetradoService } from './caracter_letrado.service';
import { CreateCaracterLetradoDto } from './dto/create-caracter_letrado.dto';
import { UpdateCaracterLetradoDto } from './dto/update-caracter_letrado.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('caracter-letrado')
export class CaracterLetradoController {
  constructor(
    private readonly caracterLetradoService: CaracterLetradoService,
  ) {}

  @Post()
  create(@Body() createCaracterLetradoDto: CreateCaracterLetradoDto) {
    return this.caracterLetradoService.create(createCaracterLetradoDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.caracterLetradoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caracterLetradoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCaracterLetradoDto: UpdateCaracterLetradoDto,
  ) {
    return this.caracterLetradoService.update(+id, updateCaracterLetradoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caracterLetradoService.remove(+id);
  }
}
