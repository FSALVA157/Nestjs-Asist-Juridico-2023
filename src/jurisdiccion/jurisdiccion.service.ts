import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJurisdiccionDto } from './dto/create-jurisdiccion.dto';
import { UpdateJurisdiccionDto } from './dto/update-jurisdiccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jurisdiccion } from './entities/jurisdiccion.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from '../common/filters/handle-exceptions';

@Injectable()
export class JurisdiccionService {
  constructor(
    @InjectRepository(Jurisdiccion)
    private readonly jurisdiccionRepository: Repository<Jurisdiccion>,
  ) {}

  async create(createJurisdiccionDto: CreateJurisdiccionDto) {
    try {
      const nuevaJurisdiccion = this.jurisdiccionRepository.create(
        createJurisdiccionDto,
      );
      await this.jurisdiccionRepository.save(nuevaJurisdiccion);
      return nuevaJurisdiccion;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.jurisdiccionRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.jurisdiccionRepository.findOneOrFail({
        where: { id_jurisdiccion: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateJurisdiccionDto: UpdateJurisdiccionDto) {
    try {
      const res = await this.jurisdiccionRepository.update(
        { id_jurisdiccion: id },
        updateJurisdiccionDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Jurisdiccion',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
      //  this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.jurisdiccionRepository.softDelete({
        id_jurisdiccion: id,
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

  // private handleDBExceptions(error: any) {
  //   console.error(error.code);
  //   console.warn(error.code === '23505');

  //   if (error.code === 404) {
  //     throw new NotFoundException();
  //   }
  //   if (error.code === '23505') {
  //     throw new BadRequestException(error.detail);
  //   }
  //   if (error.response.statusCode === 404) {
  //     throw new NotFoundException(error.message);
  //   }

  //   throw new InternalServerErrorException('Unexpected error  check the logs');
  // }
}
