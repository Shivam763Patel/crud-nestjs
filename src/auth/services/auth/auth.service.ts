import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginParams } from 'src/auth/utils/types';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor
    (
        @InjectRepository(User) private userRepositorty: Repository<User>

    ) {}


    // async createUsers(username: string, password: string) :Promise <any>

    // {

    // }
    

    // async createUsers(UserDetails: loginParams): Promise<void>
    // {

    //     const { username, password  } = UserDetails

    // }

}
