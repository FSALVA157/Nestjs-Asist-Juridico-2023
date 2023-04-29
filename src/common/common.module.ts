import { Module } from '@nestjs/common';
import { AllExceptionFilter } from './filters/http-exception.filter';
import { PaginationDto } from './dtos/pagination.dto';

@Module({})
export class CommonModule {}
