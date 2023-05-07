import { Transform } from 'class-transformer';
import {
  IsISO8601,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateMovimientoCasoDto {
  @IsInt({ message: 'La clave de caso debe ser un entero' })
  caso_id: number;

  @IsISO8601()
  @Transform(() => Date)
  fecha: Date;

  @IsOptional()
  @Length(5, 500, {
    message:
      'El detalle debe tener entre $constraint1 y $constraint2 caracteres',
  })
  detalle?: string;

  @IsString({ message: 'El tipo de movimiento es un texto' })
  @IsIn(['inherente', 'no inherente'], {
    message:
      "Los valores posibles para el tipo de movimiento son : 'inherente' o 'no inherente'",
  })
  tipo_movimiento: string;

  @IsString({ message: 'La etapa del movimiento es un texto' })
  @Length(3, 100, {
    message: 'La etapa debe tener entre $constraint1 y $constraint2 caracteres',
  })
  etapa: string;
}
