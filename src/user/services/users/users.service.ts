import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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




    async createUsers(UserDetails: createUserParams): Promise<void>
    {

        const { username, password  } = UserDetails

        const user= new User()
        {
        
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password,user.salt)
        user.createdAt = new Date()
   
        const usernew = await this.userRepositorty.find({ where : { username } })
        console.log('usernew: ', usernew);
        
        
        if(usernew)
        {
            
         throw new HttpException('user already added', HttpStatus.BAD_REQUEST)

        }

        else
        {
            const userdata = await this.userRepositorty.save(user);
            console.log("user data new zz",userdata)
        
        }
         
      
        // try
        // {

        // const userdata = await this.userRepositorty.save(user);
        // console.log("user data new zz",userdata)
    
        // }
        // catch(error)
        // {

        //     if(error)
        //     {
        //         throw new ConflictException('Username already exists')
        //     }

        //     else
        //     {
        //         throw new InternalServerErrorException()
        //     }
        

        
        // const datauser = await this.userRepositorty.find()

        // console.log("user data",datauser)

                //Main logic OLD = start
                
                // const newUser = this.userRepositorty.create({

                //     ...UserDetails,
                //     createdAt: new Date(),
                // })

                // return await this.userRepositorty.save(newUser);

                //Main logic OLD = End
        
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
    
}


    private async hashPassword(password: string, salt: string):Promise<string>
    {
        return bcrypt.hash(password,salt)
    }

    // async validatePassword(password: string): Promise<boolean>
    // {
    // const hash = await bcrypt.hash(password,this.salt)
    // console.log('hash: ', hash)

    // return hash === this.password

    // }

    // async loginUser(UserDetails: createUserParams): Promise<void>
    // {
        
    //         const username = await this.userRepositorty.validateUserPassword(UserDetails)

    //         if(!username)
    //         {
    //             throw new UnauthorizedException('Invalid credentials')
    //         }
            
    // }


    // async validateUserPassword(UserDetails: createUserParams): Promise<string>
    // {
    //     const { username, password  } = UserDetails

    //     const user = await this.userRepositorty.find({ where : { username } })

    //     if(!username)
    //     {
    //         throw new UnauthorizedException('Invalid credentials')
    //     }
    //     else
    //     {
    //       if(user && await user.validatePassword(password))
    //       {
    //         return user.username
    //       }
    //       else
    //       {
    //           return null
    //       }

    //     }
       

        
    
    // }


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