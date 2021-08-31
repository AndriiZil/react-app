import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Directory } from './Directory';
import { File } from './File';

@Entity()
export class Subfolder {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Directory, directory => directory.subfolders, {
        onDelete: 'CASCADE'
    })
    directory: Directory | string | null;

    @OneToMany(() => File, file => file.subfolder, {
        onDelete: 'CASCADE'
    })
    files: File[];

}
