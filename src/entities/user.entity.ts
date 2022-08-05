import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column()
    salt: string

    @Column('text', { default: '' })
    photo: string

    @Column()
    roleId: number

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

//     @ManyToOne((type) => Category, (category) => category.children)
//     parent: Category

//     @OneToMany((type) => Category, (category) => category.parent)
//     children: Category[]
}