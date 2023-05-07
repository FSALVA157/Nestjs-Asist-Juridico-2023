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

@Injectable()
export class CasosService {
  constructor(
    @InjectRepository(Caso)
    private readonly casoRepository: Repository<Caso>,
  ) {}

  async create(createCasoDto: CreateCasoDto) {
    try {
      const nuevoCaso = this.casoRepository.create(createCasoDto);
      console.log('mostrando nuevo caso>>>>>>>>>>>>>>>>>>>');
      console.log(nuevoCaso);
      await this.casoRepository.save(nuevoCaso);
      return nuevoCaso;
    } catch (error) {
      console.warn(error);
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.casoRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBExceptions(error);
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
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.casoRepository.softDelete({ id_caso: id });
      if (res.affected == 0) throw new Error('No existe el registro a borrar');
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
    throw new InternalServerErrorException('Unexpected error  check the logs');
  }
}
