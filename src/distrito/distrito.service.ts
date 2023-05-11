import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistritoDto } from './dto/create-distrito.dto';
import { UpdateDistritoDto } from './dto/update-distrito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Distrito } from './entities/distrito.entity';
import { handleDBExceptions } from 'src/common/filters/handle-exceptions';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class DistritoService {
  constructor(
    @InjectRepository(Distrito)
    private readonly distritoRepository: Repository<Distrito>,
  ) {}
  async create(createDistritoDto: CreateDistritoDto) {
    try {
      const nuevoDistrito = this.distritoRepository.create(createDistritoDto);
      await this.distritoRepository.save(nuevoDistrito);
      return nuevoDistrito;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.distritoRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      console.error(error);
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.distritoRepository.findOneOrFail({
        where: { id_distrito: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateDistritoDto: UpdateDistritoDto) {
    try {
      const res = await this.distritoRepository.update(
        { id_distrito: id },
        updateDistritoDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Distrito',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
      //  this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.distritoRepository.softDelete({
        id_distrito: id,
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
