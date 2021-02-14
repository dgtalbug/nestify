import { RoleType } from 'src/common/constants';
import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';
import { UserDto } from '../dto';
import { PasswordTransformer } from '../transformers';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column({ unique: true,nullable: true })
    username: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.LISTENER })
    role: RoleType;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, transformer: new PasswordTransformer() })
    password: string;

    dtoClass = UserDto;
}
