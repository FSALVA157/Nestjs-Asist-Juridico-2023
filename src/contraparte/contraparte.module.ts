import { Module } from '@nestjs/common';
import { ContraparteService } from './contraparte.service';
import { ContraparteController } from './contraparte.controller';

@Module({
  controllers: [ContraparteController],
  providers: [ContraparteService]
})
export class ContraparteModule {}
