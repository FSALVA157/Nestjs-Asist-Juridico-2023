import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoProcesoDto {
  @IsString()
  @IsNotEmpty()
  tipo_proceso: string;
}
