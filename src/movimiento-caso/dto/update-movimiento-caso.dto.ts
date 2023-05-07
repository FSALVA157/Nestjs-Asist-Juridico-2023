import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoCasoDto } from './create-movimiento-caso.dto';

export class UpdateMovimientoCasoDto extends PartialType(CreateMovimientoCasoDto) {}
