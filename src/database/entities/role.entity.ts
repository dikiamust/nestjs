import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    name: string
}