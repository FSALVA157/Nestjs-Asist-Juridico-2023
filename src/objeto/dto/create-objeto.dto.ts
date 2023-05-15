import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateObjetoDto {
  @IsString()
  @IsNotEmpty({ message: 'El objeto no puede ser nulo' })
  @Length(5, 100, {
    message:
      'El objeto debe tener entre $constraint1 y $constraint2 caracteres',
  })
  objeto: string;

  @IsNotEmpty({ message: 'El tipo no puede ser nulo' })
  @IsInt({ message: 'El tipo de proceso debe ser una clave entera' })
  tipo_proceso_id: number;

  @IsNotEmpty({ message: 'El fuero no puede ser nulo' })
  @IsInt({ message: 'El fuero debe ser una clave entera' })
  fuero_id: number;
}
