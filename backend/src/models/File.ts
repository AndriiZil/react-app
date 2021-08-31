import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Directory } from './Directory';
import { Subfolder } from './Subfolder';

@Entity()
export class File {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Index({ fulltext: true })
    @Column()
    name: string;

    @ManyToOne(() => Subfolder, subfolder => subfolder.files, {
        onDelete: 'CASCADE'
    })
    subfolder: Subfolder | string | null;

    @ManyToOne(() => Directory, directory => directory.files, {
        onDelete: 'CASCADE'
    })
    directory: Subfolder | string | null;

}
