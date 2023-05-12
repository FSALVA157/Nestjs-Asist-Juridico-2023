import { PartialType } from '@nestjs/mapped-types';
import { CreateFueroDto } from './create-fuero.dto';

export class UpdateFueroDto extends PartialType(CreateFueroDto) {}
