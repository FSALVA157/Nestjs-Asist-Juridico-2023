import { Injectable } from '@nestjs/common';
import { CreateContraparteDto } from './dto/create-contraparte.dto';
import { UpdateContraparteDto } from './dto/update-contraparte.dto';

@Injectable()
export class ContraparteService {
  create(createContraparteDto: CreateContraparteDto) {
    return 'This action adds a new contraparte';
  }

  findAll() {
    return `This action returns all contraparte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contraparte`;
  }

  update(id: number, updateContraparteDto: UpdateContraparteDto) {
    return `This action updates a #${id} contraparte`;
  }

  remove(id: number) {
    return `This action removes a #${id} contraparte`;
  }
}
