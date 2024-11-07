import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "translates" })
export class Translate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'about', type: 'varchar', nullable: false })
    about: string;

    @Column({ name: 'type', type: 'text', nullable: true })
    type: string;
}
