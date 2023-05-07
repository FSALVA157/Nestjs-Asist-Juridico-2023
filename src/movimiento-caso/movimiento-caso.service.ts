import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovimientoCasoDto } from './dto/create-movimiento-caso.dto';
import { UpdateMovimientoCasoDto } from './dto/update-movimiento-caso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovimientoCaso } from './entities/movimiento-caso.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class MovimientoCasoService {
  constructor(
    @InjectRepository(MovimientoCaso)
    private readonly movimientoRepository: Repository<MovimientoCaso>,
  ) {}

  async create(createMovimientoCasoDto: CreateMovimientoCasoDto) {
    try {
      const nuevoMovimiento = this.movimientoRepository.create(
        createMovimientoCasoDto,
      );
      await this.movimientoRepository.save(nuevoMovimiento);
      return nuevoMovimiento;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.movimientoRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.movimientoRepository.findOneOrFail({
        where: { id_mov_caso: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateMovimientoCasoDto: UpdateMovimientoCasoDto) {
    try {
      const res = await this.movimientoRepository.update(
        { id_mov_caso: id },
        updateMovimientoCasoDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Movimiento',
        );
      return res;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.movimientoRepository.softDelete({
        id_mov_caso: id,
      });
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
    throw new InternalServerErrorException('Unexpected error check the logs');
  }
}
