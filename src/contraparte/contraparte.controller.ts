import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContraparteService } from './contraparte.service';
import { CreateContraparteDto } from './dto/create-contraparte.dto';
import { UpdateContraparteDto } from './dto/update-contraparte.dto';

@Controller('contraparte')
export class ContraparteController {
  constructor(private readonly contraparteService: ContraparteService) {}

  @Post()
  create(@Body() createContraparteDto: CreateContraparteDto) {
    return this.contraparteService.create(createContraparteDto);
  }

  @Get()
  findAll() {
    return this.contraparteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contraparteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContraparteDto: UpdateContraparteDto) {
    return this.contraparteService.update(+id, updateContraparteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contraparteService.remove(+id);
  }
}
