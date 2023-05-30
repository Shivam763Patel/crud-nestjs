import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user-crud'})
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    createdAt: Date


}