import { Module } from '@nestjs/common';
import { MovimientoCasoService } from './movimiento-caso.service';
import { MovimientoCasoController } from './movimiento-caso.controller';
import { MovimientoCaso } from './entities/movimiento-caso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoCaso])],
  controllers: [MovimientoCasoController],
  providers: [MovimientoCasoService],
})
export class MovimientoCasoModule {}
