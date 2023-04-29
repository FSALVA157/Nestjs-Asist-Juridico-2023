import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(7, { message: 'el dni o cuil debe ser válido' })
  dni_cuit: string;

  @IsNumber()
  categoria_id: number;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'la razo social debe ser un texto válido' })
  razon_social?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'el nombre social debe ser un texto válido' })
  nombre?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'el apellido debe ser un texto válido' })
  apellido?: string;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: 'el domicilio real debe ser un texto válido' })
  domicilio_real?: string;

  @IsString()
  @MinLength(10, {
    message: 'el domicilio alternativo debe ser un texto válido',
  })
  @IsOptional()
  domicilio_alternativo?: string;

  @IsNumber()
  @IsPositive()
  provincia_id: number;

  @IsNumber()
  @IsPositive()
  departamento_id: number;

  @IsNumber()
  @IsPositive()
  localidad_id: number;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'el telefono celular debe ser válido' })
  telefono_celular?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'el telefono alternativo debe ser válido' })
  telefono_alternativo?: string;

  @IsString()
  @IsOptional()
  @MinLength(4, { message: 'la ocupación debe ser un texto válido' })
  ocupacion?: string;

  @IsString()
  @IsOptional()
  @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, {
    message: 'El email no es correcto',
  })
  @Length(4, 50, {
    message:
      'El email debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras',
  })
  email?: string;
}
