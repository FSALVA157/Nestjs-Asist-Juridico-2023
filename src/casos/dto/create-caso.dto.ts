import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EtapaDto } from './etapa.dto';

export class CreateCasoDto {
  @IsArray()
  @ValidateNested({
    each: true,
    message: 'Cada Etapa debe tener el formato correcto',
  })
  @Type(() => EtapaDto)
  etapas: EtapaDto[];
}
