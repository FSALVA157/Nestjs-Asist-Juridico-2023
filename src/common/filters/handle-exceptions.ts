import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const handleDBExceptions = (error: any) => {
  if (error.code === 404) {
    throw new NotFoundException();
  }
  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  if (error.response.statusCode === 404) {
    throw new NotFoundException(error.message);
  }

  throw new InternalServerErrorException('Unexpected error  check the logs');
};
