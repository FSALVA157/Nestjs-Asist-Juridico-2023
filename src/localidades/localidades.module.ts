import { Module } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { LocalidadesController } from './localidades.controller';
import { Localidad } from './entities/localidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Localidad])],
  controllers: [LocalidadesController],
  providers: [LocalidadesService],
})
export class LocalidadesModule {}
