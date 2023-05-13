import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoProcesoDto } from './dto/create-tipo-proceso.dto';
import { UpdateTipoProcesoDto } from './dto/update-tipo-proceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoProceso } from './entities/tipo-proceso.entity';
import { handleDBExceptions } from 'src/common/filters/handle-exceptions';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TipoProcesoService {
  constructor(
    @InjectRepository(TipoProceso)
    private readonly tipoProcesoRepository: Repository<TipoProceso>,
  ) {}
  async create(createTipoProcesoDto: CreateTipoProcesoDto) {
    try {
      const nuevoTipo = this.tipoProcesoRepository.create(createTipoProcesoDto);
      await this.tipoProcesoRepository.save(nuevoTipo);
      return nuevoTipo;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.tipoProcesoRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.tipoProcesoRepository.findOneOrFail({
        where: { id_tipo_proceso: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateTipoProcesoDto: UpdateTipoProcesoDto) {
    try {
      const res = await this.tipoProcesoRepository.update(
        { id_tipo_proceso: id },
        updateTipoProcesoDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Tipo Proceso',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
      //  this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.tipoProcesoRepository.softDelete({
        id_tipo_proceso: id,
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
