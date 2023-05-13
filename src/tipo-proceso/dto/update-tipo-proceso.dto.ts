import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoProcesoDto } from './create-tipo-proceso.dto';

export class UpdateTipoProcesoDto extends PartialType(CreateTipoProcesoDto) {}
