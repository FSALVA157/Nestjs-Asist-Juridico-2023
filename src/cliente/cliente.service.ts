import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from '../common/filters/handle-exceptions';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const nuevoCliente = this.clienteRepository.create(createClienteDto);
      await this.clienteRepository.save(nuevoCliente);
      return nuevoCliente;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 0, offset = 0 } = paginationDto;
      return await this.clienteRepository.findAndCount({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.clienteRepository.findOneOrFail({
        where: { id_cliente: id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const res = await this.clienteRepository.update(
        { id_cliente: id },
        updateClienteDto,
      );
      if (res.affected == 0)
        throw new NotFoundException(
          'Error No se Actualizo ningún Registro Cliente',
        );
      return res;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.clienteRepository.softDelete({ id_cliente: id });
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
