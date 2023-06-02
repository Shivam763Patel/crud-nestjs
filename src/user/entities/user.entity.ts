import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Post } from "./post.entity";
import { Profile } from "./profile.entity";
import * as bcrypt from 'bcrypt';
@Entity({ name: 'user-crud'})
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string

    @Column()
    salt: string


    @Column()
    password: string

    @Column()
    createdAt: Date

    // @OneToOne( () => Profile)
    // @JoinColumn()
    // profile: Profile
   
    
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Profile, (profile) => profile.user)
    profiles: Profile[]

    validateUserPassword: String
  
}