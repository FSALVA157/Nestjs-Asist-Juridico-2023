import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateLocalidadDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  id_localidad: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  provincia_id: number;

  @IsString()
  @MinLength(2, { message: 'el nombre de la localidad debe ser válido' })
  localidad: string;
}
