import { UtilsService } from 'src/providers';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
    to(value) {
        return UtilsService.generateHash(value);
    }
    from(value) {
        return value;
    }
}
