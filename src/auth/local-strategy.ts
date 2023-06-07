import { Inject, Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { response } from "express";
import { Strategy } from "passport-local";
import { UsersService } from "src/user/services/users/users.service";
import { createUserParams } from "src/utils/types";
import { AuthService } from "./services/auth/auth.service";
import { loginParams } from "./utils/types";



@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy)
{

    constructor
    (
        private authService: AuthService ,)

        

    {
        super();
    }


    async validate(username: string, password: string)
    {

        // this.authServices.validateUser(username,password)
        // const user= await this.authServices.createUsers(username,password)

        // if(!user) throw new UnauthorizedException();

        console.log("username",username)
        console.log("password",password)

        // const result = await this.authService.validateUser(username,password)
        
        // return result
        
        
    }
}