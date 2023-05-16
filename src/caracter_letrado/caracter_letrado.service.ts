import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaracterLetradoDto } from './dto/create-caracter_letrado.dto';
import { UpdateCaracterLetradoDto } from './dto/update-caracter_letrado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaracterLetrado } from './entities/caracter_letrado.entity';
import { Repository } from 'typeorm';
import { handleDBExceptions } from 'src/common/filters/handle-exceptions';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CaracterLetradoService {
  constructor(
    @InjectRepository(CaracterLetrado)
    private readonly letradoRepository: Repository<CaracterLetrado>,
  ) {}

  async create(createCaracterLetradoDto: CreateCaracterLetradoDto) {
    try {
      const nuevoRol = this.letradoRepository.create(createCaracterLetradoDto);
      await this.letradoRepository.save(nuevoRol);
      return nuevoRol;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.letradoRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.letradoRepository.findOneOrFail({
        where: { id_caracter_letrado: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateCaracterLetradoDto: UpdateCaracterLetradoDto) {
    try {
      const res = await this.letradoRepository.update(
        { id_caracter_letrado: id },
        updateCaracterLetradoDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Caracter del Letrado',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.letradoRepository.softDelete({
        id_caracter_letrado: id,
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
