import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Localidad } from './entities/localidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class LocalidadesService {
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
  ) {}

  async create(createLocalidadDto: CreateLocalidadDto) {
    try {
      const nuevaLocalidad =
        this.localidadRepository.create(createLocalidadDto);
      await this.localidadRepository.save(nuevaLocalidad);
      return nuevaLocalidad;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.localidadRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.localidadRepository.findOneOrFail({
        where: { id_localidad: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateLocalidadDto: UpdateLocalidadDto) {
    try {
      const res = await this.localidadRepository.update(
        { id_localidad: id },
        updateLocalidadDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Localidad',
        );
      return res;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.localidadRepository.delete({
        id_localidad: id,
      });
      if (res.affected == 0) throw new Error('No existe el registro a borrar');
      return res;
    } catch (error) {
      throw new NotFoundException(error.message);
      //this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.response.statusCode === 404)
      throw new NotFoundException(error.message);

    if (error.code === 404) {
      throw new NotFoundException();
    }
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected error creating cliente check the logs',
    );
  }
}
