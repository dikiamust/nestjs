import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string
}