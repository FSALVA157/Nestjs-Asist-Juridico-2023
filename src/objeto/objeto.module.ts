import { Module } from '@nestjs/common';
import { ObjetoService } from './objeto.service';
import { ObjetoController } from './objeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objeto } from './entities/objeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Objeto])],
  controllers: [ObjetoController],
  providers: [ObjetoService],
})
export class ObjetoModule {}
