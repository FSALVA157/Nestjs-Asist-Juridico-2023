import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class EtapaDto {
  @IsString()
  @IsNotEmpty()
  etapa: string;

  @IsInt()
  plazo: number;
}
