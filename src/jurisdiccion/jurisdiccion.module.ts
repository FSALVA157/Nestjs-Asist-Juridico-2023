import { Module } from '@nestjs/common';
import { JurisdiccionService } from './jurisdiccion.service';
import { JurisdiccionController } from './jurisdiccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jurisdiccion } from './entities/jurisdiccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jurisdiccion])],
  controllers: [JurisdiccionController],
  providers: [JurisdiccionService],
})
export class JurisdiccionModule {}
