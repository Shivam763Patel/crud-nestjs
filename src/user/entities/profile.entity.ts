import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user-profile'})
export class Profile
{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @ManyToOne(() => User, (user)=> user.profiles)
    user: User

    
    
}