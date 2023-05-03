import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProvinciaDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  id_provincia: number;

  @IsString()
  @MinLength(2, { message: 'el nombre de la provincia debe ser válido' })
  provincia: string;
}
