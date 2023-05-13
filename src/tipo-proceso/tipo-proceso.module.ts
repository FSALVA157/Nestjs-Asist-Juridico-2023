import { Module } from '@nestjs/common';
import { TipoProcesoService } from './tipo-proceso.service';
import { TipoProcesoController } from './tipo-proceso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProceso } from './entities/tipo-proceso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProceso])],
  controllers: [TipoProcesoController],
  providers: [TipoProcesoService],
})
export class TipoProcesoModule {}
