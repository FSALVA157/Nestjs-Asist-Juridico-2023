import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateObjetoDto } from './dto/create-objeto.dto';
import { UpdateObjetoDto } from './dto/update-objeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Objeto } from './entities/objeto.entity';
import { Repository } from 'typeorm';
import { handleDBExceptions } from 'src/common/filters/handle-exceptions';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ObjetoService {
  constructor(
    @InjectRepository(Objeto)
    private readonly objetoRepository: Repository<Objeto>,
  ) {}

  async create(createObjetoDto: CreateObjetoDto) {
    try {
      const nuevoObjeto = this.objetoRepository.create(createObjetoDto);
      await this.objetoRepository.save(nuevoObjeto);
      return nuevoObjeto;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      const res = await this.objetoRepository.findAndCount({
        take: limit,
        skip: offset,
      });

      const res_flat = res[0].map((objeto) => {
        return {
          ...objeto,
          fuero: objeto.fuero.fuero,
          tipo_proceso: objeto.tipo_proceso.tipo_proceso,
        };
      });
      return res_flat;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.objetoRepository.findOneOrFail({
        where: { id_objeto: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateObjetoDto: UpdateObjetoDto) {
    try {
      const res = await this.objetoRepository.update(
        { id_objeto: id },
        updateObjetoDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Objeto',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
      //  this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.objetoRepository.softDelete({
        id_objeto: id,
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
