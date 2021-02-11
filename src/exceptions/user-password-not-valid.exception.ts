import { ForbiddenException } from '@nestjs/common';

export class UserPasswordNotValidException extends ForbiddenException {
  constructor(error?: string) {
    super('user_password_not_valid', error);
  }
}
