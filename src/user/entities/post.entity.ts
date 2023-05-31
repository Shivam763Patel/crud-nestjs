import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name :'user-post'})
export class Post
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    caption: string
    
    @ManyToOne(() => User, (user)=> user.posts)
    user: User

}