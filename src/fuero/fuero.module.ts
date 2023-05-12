import { Module } from '@nestjs/common';
import { FueroService } from './fuero.service';
import { FueroController } from './fuero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuero } from './entities/fuero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fuero])],
  controllers: [FueroController],
  providers: [FueroService],
})
export class FueroModule {}
