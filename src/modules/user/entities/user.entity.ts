import { UserRoles } from "src/utils/enums/user-role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "first_name", type: "varchar", nullable: true })
    firstName: string

    @Column({ name: "last_name", type: "varchar", nullable: true })
    lastName: string

    @Column({ name: "email", type: "varchar", nullable: false })
    email: string

    @Column({ name: "role", type: "enum", enum: UserRoles, default: UserRoles.USER })
    role: UserRoles

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date
}
