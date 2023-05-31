import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/user/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { createUserParams, createUserPostParams, createUserProfilParams, updateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
 

@Injectable()
export class UsersService {

    constructor 
    (
        @InjectRepository(User) private userRepositorty: Repository<User>,
        @InjectRepository(Profile) private profileRepositorty: Repository<Profile>, 
        @InjectRepository(Post) private postRepositorty: Repository<Post>, 
        
        
    
    ) {}
    
    findUsers()
    {
        return this.userRepositorty.find({ relations: ['posts']})
    }

    createUsers(UserDetails: createUserParams)
    {
        const newUser = this.userRepositorty.create({

            ...UserDetails,
            createdAt: new Date(),
        });

        return this.userRepositorty.save(newUser);
    }

    updateUser(id: number, upadeUserDetails: updateUserParams)
    {
        return this.userRepositorty.update({ id }, {...upadeUserDetails})
    }

    deleteUser(id: number)
    {
        return this.userRepositorty.delete( { id });
    }

    async createUserProfile(id: number, createUserProfileDetails:  createUserProfilParams)
    {
        const user = await this.userRepositorty.findOneBy({ id })


        if(!user)
        
            throw new HttpException({
                reason: 'User not found, can not create profile'
            },
            HttpStatus.BAD_REQUEST)


        
        const newProfile = this.profileRepositorty.create(createUserProfileDetails);

        const savedProfile = await this.profileRepositorty.save(newProfile)

        user.profile = savedProfile

        return this.userRepositorty.save(user);


        
    }

    //OneToMany: User profile
    async createUserProfileNew (id: number, createUserProfileDetails:  createUserProfilParams)
    {
        const user = await this.userRepositorty.findOneBy( { id })

        if(!user)

            throw new HttpException({
                reason: 'User not found, can not create profile'
            },
            HttpStatus.BAD_REQUEST)
        
                
            const newProfile = this.profileRepositorty.create(createUserProfileDetails);

            const savedProfile = await this.profileRepositorty.save(newProfile)
    
            user.profile = savedProfile
    
            return this.userRepositorty.save(user);

    }


    async createUserPost(id: number, createUserPostDetails: createUserPostParams)
    {

        const user = await this.userRepositorty.findOneBy({ id });

        if(!user)

        throw new HttpException({
            reason: 'User not found, can not create profile'
        },
        HttpStatus.BAD_REQUEST)

        const newPost = this.postRepositorty.create({

            ...createUserPostDetails,
            user
        });

       return this.postRepositorty.save(newPost)


    }


}