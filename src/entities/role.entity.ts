import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    // @ManyToOne(() => User, (user) => user.roleId)
    // user: User
    id: number

    @Column({ nullable: false, unique: true })
    name: string
}