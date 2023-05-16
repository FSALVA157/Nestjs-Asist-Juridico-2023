import { Module } from '@nestjs/common';
import { CaracterLetradoService } from './caracter_letrado.service';
import { CaracterLetradoController } from './caracter_letrado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaracterLetrado } from './entities/caracter_letrado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaracterLetrado])],
  controllers: [CaracterLetradoController],
  providers: [CaracterLetradoService],
})
export class CaracterLetradoModule {}
