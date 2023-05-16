import { PartialType } from '@nestjs/mapped-types';
import { CreateCaracterLetradoDto } from './create-caracter_letrado.dto';

export class UpdateCaracterLetradoDto extends PartialType(CreateCaracterLetradoDto) {}
