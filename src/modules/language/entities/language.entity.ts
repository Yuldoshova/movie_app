import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "languages" })
export class Language {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'code', type: 'varchar', nullable: false })
    code: string;

    @Column({ name: 'title', type: 'text', nullable: false })
    title: string;

    @Column({ name: 'image', type: 'varchar', nullable: true })
    image: string;
}
