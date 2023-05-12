import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFueroDto } from './dto/create-fuero.dto';
import { UpdateFueroDto } from './dto/update-fuero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fuero } from './entities/fuero.entity';
import { handleDBExceptions } from 'src/common/filters/handle-exceptions';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class FueroService {
  constructor(
    @InjectRepository(Fuero)
    private readonly fueroRepository: Repository<Fuero>,
  ) {}
  async create(createFueroDto: CreateFueroDto) {
    try {
      const nuevoFuero = this.fueroRepository.create(createFueroDto);
      await this.fueroRepository.save(nuevoFuero);
      return nuevoFuero;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.fueroRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.fueroRepository.findOneOrFail({
        where: { id_fuero: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateFueroDto: UpdateFueroDto) {
    try {
      const res = await this.fueroRepository.update(
        { id_fuero: id },
        updateFueroDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Fuero',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
      //  this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.fueroRepository.softDelete({
        id_fuero: id,
      });
      if (res.affected == 0) throw new Error('No existe el registro a borrar');
      return {
        ...res,
        message: `El Registro ${id} ha sido borrado`,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
      //this.handleDBExceptions(error);
    }
  }
}
