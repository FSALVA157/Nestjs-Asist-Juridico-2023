import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFueroDto {
  @IsString()
  @IsNotEmpty()
  fuero: string;
}
