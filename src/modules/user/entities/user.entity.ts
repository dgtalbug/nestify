import { RoleType } from 'src/common/constants';
import { AbstractEntity } from 'src/common/entities';
import { UserDto } from 'src/modules/user/dto';
import { PasswordTransformer } from 'src/modules/user/transformers';
import { Column, Entity } from 'typeorm';

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
