import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincia } from './entities/provincia.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProvinciasService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async create(createProvinciaDto: CreateProvinciaDto) {
    try {
      const nuevaProvincia =
        this.provinciaRepository.create(createProvinciaDto);
      await this.provinciaRepository.save(nuevaProvincia);
      return nuevaProvincia;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.provinciaRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.provinciaRepository.findOneOrFail({
        where: { id_provincia: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateProvinciaDto: UpdateProvinciaDto) {
    try {
      const res = await this.provinciaRepository.update(
        { id_provincia: id },
        updateProvinciaDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Provincia',
        );
      return res;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.provinciaRepository.delete({
        id_provincia: id,
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
