import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
// import { loginParams } from 'src/auth/utils/types';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/services/users/users.service';
import { Repository } from 'typeorm';
import { loginUserParams } from 'src/utils/types';
import { loginParams } from 'src/auth/utils/types';

export type Usernew = any
@Injectable()


export class AuthService {
    

    constructor
    (
       
        @Inject(UsersService) private readonly userService: UsersService

    ) {}


    // async createUsers(username: string, password: string) :Promise <any>

    // {

    // }
    

    // async createUsers(UserDetails: loginParams): Promise<void>
    // {

    //     const { username, password  } = UserDetails

    // }


    async validateUser(UserDetails: loginUserParams)
    {




            const logindata = this.userService.findUserByUsername(UserDetails)
            {
                console.log("logged in",logindata)
                // if(logindata && logindata.password === password)
                // {
                //     console.log("logged in",logindata)
                // }
                // else{
                //     console.log("logged failed")
                // }
                // return null
            }
    }

}
