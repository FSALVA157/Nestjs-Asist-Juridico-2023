import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateJurisdiccionDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['provincial', 'federal'])
  jurisdiccion: string;
}
