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
import { FueroService } from './fuero.service';
import { CreateFueroDto } from './dto/create-fuero.dto';
import { UpdateFueroDto } from './dto/update-fuero.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('fuero')
export class FueroController {
  constructor(private readonly fueroService: FueroService) {}

  @Post()
  create(@Body() createFueroDto: CreateFueroDto) {
    return this.fueroService.create(createFueroDto);
  }

  @Get()
  findAll(
    @Query()
    paginationDto: PaginationDto,
  ) {
    return this.fueroService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fueroService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFueroDto: UpdateFueroDto) {
    return this.fueroService.update(+id, updateFueroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fueroService.remove(+id);
  }
}
