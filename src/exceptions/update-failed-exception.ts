import { BadRequestException } from '@nestjs/common';

export class UpdateFailedException extends BadRequestException {
  constructor(error?: string) {
    super('update_failed', error);
  }
}
