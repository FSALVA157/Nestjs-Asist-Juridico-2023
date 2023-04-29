import { PartialType } from '@nestjs/mapped-types';
import { CreateContraparteDto } from './create-contraparte.dto';

export class UpdateContraparteDto extends PartialType(CreateContraparteDto) {}
