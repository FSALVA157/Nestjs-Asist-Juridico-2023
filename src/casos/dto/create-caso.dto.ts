import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
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

  @IsDateString()
  fecha_inicio: Date;

  @IsDateString()
  @IsOptional()
  fecha_fin: Date;

  @IsOptional()
  detalle: string;

  @IsOptional()
  expediente_nro: string;

  @IsInt({ message: 'La clave jurisdiccion debe ser un entero' })
  jurisdiccion_id: number;

  @IsInt({ message: 'El distrito debe ser un entero' })
  distrito_id: number;

  @IsInt({ message: 'El fuero debe ser un entero' })
  fuero_id: number;

  @IsInt({ message: 'El tipo de proceso es una clave entera' })
  tipo_proceso_id: number;

  @IsInt({ message: 'El objeto es una clave entera' })
  objeto_id: number;

  @IsInt({ message: 'La clave de carácter del letrado debe ser un entero' })
  caracter_letrado_id: number;
}
