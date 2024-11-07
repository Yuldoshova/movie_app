import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "definitions" })
export class Definition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "value", type: "varchar", nullable: false })
    value: string

    @Column({ name: "language_id", type: "int", nullable: false })
    languageId: number

    @Column({ name: "translate_id", type: "int", nullable: false })
    translateId: number
}