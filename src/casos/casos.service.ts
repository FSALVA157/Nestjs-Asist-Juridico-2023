import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caso } from './entities/caso.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from '../common/filters/handle-exceptions';
import { Jurisdiccion } from '../jurisdiccion/entities/jurisdiccion.entity';

@Injectable()
export class CasosService {
  constructor(
    @InjectRepository(Caso)
    private readonly casoRepository: Repository<Caso>,
  ) {}

  async create(createCasoDto: CreateCasoDto) {
    try {
      const nuevoCaso = this.casoRepository.create(createCasoDto);
      await this.casoRepository.save(nuevoCaso);
      return nuevoCaso;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      const res = await this.casoRepository.findAndCount({
        take: limit,
        skip: offset,
      });
      const resf = res[0].map((caso) => ({
        ...caso,
        jurisdiccion: caso.jurisdiccion.jurisdiccion,
        distrito: caso.distrito.distrito,
        fuero: caso.fuero.fuero,
        caracter_letrado: caso.caracter_letrado.caracter_letrado,
        tipo: caso.tipo.tipo_proceso,
        objeto: caso.objeto.objeto,
      }));
      return resf;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.casoRepository.findOneOrFail({
        where: { id_caso: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateCasoDto: UpdateCasoDto) {
    try {
      const res = await this.casoRepository.update(
        { id_caso: id },
        updateCasoDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Caso',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.casoRepository.softDelete({ id_caso: id });
      if (res.affected == 0) throw new Error('No existe el registro a borrar');
      return {
        ...res,
        message: `El Registro ${id} ha sido eliminado exitosamente`,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
      //this.handleDBExceptions(error);
    }
  }

  // private handleDBExceptions(error: any) {
  //   if (error.response.statusCode === 404)
  //     throw new NotFoundException(error.message);

  //   if (error.code === 404) {
  //     throw new NotFoundException();
  //   }
  //   if (error.code === '23505') {
  //     throw new BadRequestException(error.detail);
  //   }
  //   throw new InternalServerErrorException('Unexpected error  check the logs');
  // }
}
