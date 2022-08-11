import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { Role } from "./role.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false , unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;

    @Column('text', { default: '' })
    photo: string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    roleId: number;
    // @OneToMany(() => Role, (role) => role.id)
    // role: Role[]

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}