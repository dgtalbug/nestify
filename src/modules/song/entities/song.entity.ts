import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { GenreEntity } from '../../genre/entities/genre.entity';
import { TagEntity } from '../../tag/entities/tag.entity';

@Entity({ name: 'songs' })
export class SongEntity {
    @Column({ unique: true,nullable: true })
    name: string;

    @Column({ unique: true, nullable: true, default:'SINGER' })
    author: string;

    @Column({nullable:true, default:'https://i.scdn.co/image/4f19eb7986a7c2246d713dcc46684e2187ccea4f'})
    thumbnail: string;

    @Column({nullable:true, default:2020})
    year: number;

    @OneToOne(() => TagEntity)
    @JoinColumn()
    tag: TagEntity;

    @ManyToMany(() => GenreEntity)
    @JoinTable()
    genres: GenreEntity[];

}
