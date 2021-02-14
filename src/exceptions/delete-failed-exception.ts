import { BadRequestException } from '@nestjs/common';

export class DeleteFailedException extends BadRequestException {
  constructor(error?: string) {
    super('delete_failed', error);
  }
}
