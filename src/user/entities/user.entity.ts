import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Profile } from "./profile.entity";

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

    @OneToOne( () => Profile)
    @JoinColumn()
    profile: Profile
   
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profiles: Profile[]

}