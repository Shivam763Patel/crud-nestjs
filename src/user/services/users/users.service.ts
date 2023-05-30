import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { createUserParams, updateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
 

@Injectable()
export class UsersService {

    constructor (@InjectRepository(User) private userRepositorty: Repository<User>,)
    {

    }
    findUsers()
    {
        return this.userRepositorty.find()
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
        return this.userRepositorty.update({ id}, {...upadeUserDetails})
    }
}