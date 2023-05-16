import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCaracterLetradoDto {
  @IsString()
  @IsNotEmpty()
  caracter_letrado: string;
}
