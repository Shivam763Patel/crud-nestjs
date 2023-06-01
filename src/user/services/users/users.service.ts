import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/user/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { createUserParams, createUserPostParams, createUserProfilParams, updateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


 

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
        return this.userRepositorty.find({ relations: ['profiles', 'posts']})
    }

    // const salt = bcrypt.genSalt();


    async createUsers(UserDetails: createUserParams)
    {

        // const datauser = await this.userRepositorty.find()

        // console.log("user data",datauser)

        const newUser = this.userRepositorty.create({

            ...UserDetails,
            createdAt: new Date(),
        })

        return await this.userRepositorty.save(newUser);
        // try
        // {
        //     if(!newUser)
        //     {
        //         throw new ConflictException('Username already exists')
        //     }
        //     else
        //     {
        //      return await this.userRepositorty.save(newUser);
        //     }

        // }
        // catch(error)
        // {
        
        //         throw new InternalServerErrorException()

        
        // }
    }

    updateUser(id: number, upadeUserDetails: updateUserParams)
    {
        return this.userRepositorty.update({ id }, {...upadeUserDetails})
    }

    deleteUser(id: number)
    {
        return this.userRepositorty.delete( { id });
    }

    // async createUserProfile(id: number, createUserProfileDetails:  createUserProfilParams)
    // {
    //     const user = await this.userRepositorty.findOneBy({ id })


    //     if(!user)
        
    //         throw new HttpException({
    //             reason: 'User not found, can not create profile'
    //         },
    //         HttpStatus.BAD_REQUEST)


        
    //     const newProfile = this.profileRepositorty.create(createUserProfileDetails);

    //     const savedProfile = await this.profileRepositorty.save(newProfile)

    //     user.profile = savedProfile

    //     return this.userRepositorty.save(user);


        
    // }

    //OneToMany: User profile
    async createUserProfileNew (id: number, createUserProfileDetails:  createUserProfilParams)
    {
        const user = await this.userRepositorty.findOneBy( { id })

        if(!user)

            throw new HttpException({
                reason: 'User not found, can not create profile'
            },
            HttpStatus.BAD_REQUEST)
        
                
            // const newProfile = this.profileRepositorty.create(createUserProfileDetails);

            // const savedProfile = await this.profileRepositorty.save(newProfile)
    
            // user.profile = savedProfile
    
            // this.profileRepositorty.save(user);

            const newPost = this.profileRepositorty.create({

                ...createUserProfileDetails,
                user
            });

             return this.profileRepositorty.save(newPost)

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